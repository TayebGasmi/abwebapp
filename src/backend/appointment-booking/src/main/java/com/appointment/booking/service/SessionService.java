package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.ConfigDto;
import com.appointment.booking.dto.MeetingDto;
import com.appointment.booking.dto.MeetingParticipant;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import com.appointment.booking.entity.Student;
import com.appointment.booking.entity.Teacher;
import com.appointment.booking.enums.SessionStatus;
import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.exceptions.SessionConflictException;
import com.appointment.booking.exceptions.SessionEditExpiredException;
import com.appointment.booking.mapper.SessionMapper;
import com.appointment.booking.mapper.StudentMapper;
import com.appointment.booking.repository.SessionRepository;
import com.appointment.booking.utils.ConfigKeyConstants;
import com.google.api.services.calendar.model.Event;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SessionService extends BaseServiceImpl<Session, Long, SessionDto> {

    private final GoogleCalendarService googleCalendarService;
    private final SessionRepository sessionRepository;
    private final StudentMapper studentMapper;
    private final SessionMapper sessionMapper;
    private final ConfigService configService;

    @Override
    public SessionDto add(SessionDto sessionDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Student student = (Student) authentication.getPrincipal();
        sessionDto.setStudent(studentMapper.convertEntityToDto(student));

        setDefaultValuesIfNeeded(sessionDto);

        boolean conflictingSessionExists = sessionRepository.existsConflictingSession(sessionDto.getTeacher().getId(), sessionDto.getStudent().getId(),
            sessionDto.getStartDateTime(), sessionDto.getEndDateTime());
        if (conflictingSessionExists) {
            throw new SessionConflictException("A conflicting session exists for either the teacher or the student during this time.");
        }

        MeetingDto meetingDto = buildMeetingDto(sessionDto);
        Event event = googleCalendarService.createSimpleMeeting(meetingDto);
        sessionDto.setMeetingLink(event.getHangoutLink());

        return super.add(sessionDto);
    }

    public List<SessionDto> getCurrentUserSessionsWithinDateRange(ZonedDateTime startDate, ZonedDateTime endDate) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        List<Session> sessions;
        if (principal instanceof Student student) {
            sessions = sessionRepository.findByStudentIdAndDateRange(student.getId(), startDate, endDate);
        } else if (principal instanceof Teacher teacher) {
            sessions = sessionRepository.findByTeacherIdAndDateRange(teacher.getId(), startDate, endDate);
        } else {
            throw new IllegalStateException("Unexpected user type: " + principal.getClass().getSimpleName());
        }

        return sessionMapper.convertEntitiesToDtos(sessions);
    }

    private void setDefaultValuesIfNeeded(SessionDto sessionDto) {
        if (sessionDto.getTitle() == null || sessionDto.getTitle().isEmpty()) {
            sessionDto.setTitle(String.format("%s session", sessionDto.getSubject().getName()));
        }

        if (sessionDto.getDescription() == null || sessionDto.getDescription().isEmpty()) {
            sessionDto.setDescription(String.format("""
                Session for subject '%s'.
                """, sessionDto.getSubject().getName()));
        }

        if (sessionDto.getDuration() == null) {
            Long defaultDuration = configService.getConfigDtoByKey(ConfigKeyConstants.SESSION_DURATION)
                .map(ConfigDto::getValue)
                .map(Long::parseLong)
                .orElse(60L);
            sessionDto.setDuration(defaultDuration);
        }

        if (sessionDto.getPrice() == null) {
            BigDecimal defaultPrice = configService.getConfigDtoByKey(ConfigKeyConstants.SESSION_PRICE)
                .map(ConfigDto::getValue)
                .map(BigDecimal::new)
                .orElse(BigDecimal.valueOf(25));
            sessionDto.setPrice(defaultPrice);
        }

        if (sessionDto.getEndDateTime() == null) {
            sessionDto.setEndDateTime(sessionDto.getStartDateTime().plusMinutes(sessionDto.getDuration()));
        }

        if (sessionDto.getStatus() == null) {
            sessionDto.setStatus(SessionStatus.ACCEPTED_BY_TEACHER);
        }
    }


    private MeetingDto buildMeetingDto(SessionDto sessionDto) {
        return MeetingDto.builder().summary(sessionDto.getTitle()).description(sessionDto.getDescription()).startDate(sessionDto.getStartDateTime())
            .endDate(sessionDto.getEndDateTime()).participants(Set.of(MeetingParticipant.builder().email(sessionDto.getStudent().getEmail())
                    .displayName(String.format("%s %s", sessionDto.getStudent().getFirstName(), sessionDto.getStudent().getLastName())).build(),
                MeetingParticipant.builder().email(sessionDto.getTeacher().getEmail())
                    .displayName(String.format("%s %s", sessionDto.getTeacher().getFirstName(), sessionDto.getTeacher().getLastName())).build())).build();
    }


    public SessionDto updateSessionStartTime(SessionDto sessionDto) throws SessionEditExpiredException {

        Session existingSession = sessionRepository.findById(sessionDto.getId()).orElseThrow(() -> new NotFoundException("session not found"));
        existingSession.setEndDateTime(sessionDto.getStartDateTime().plusMinutes(existingSession.getDuration()));
        existingSession.setStartDateTime(sessionDto.getStartDateTime());
        if (existingSession.getCreatedDate().isBefore(LocalDateTime.now().minusDays(1))) {
            throw new SessionEditExpiredException("unable to edit session ");
        }
        boolean conflictingSessionExists = sessionRepository.existsConflictingSession(sessionDto.getTeacher().getId(), sessionDto.getStudent().getId(),
            sessionDto.getStartDateTime(), sessionDto.getEndDateTime());
        if (conflictingSessionExists) {
            throw new SessionConflictException("A conflicting session exists for either the teacher or the student during this time.");
        }



        if (existingSession.getMeetingLink() != null && !existingSession.getMeetingLink().isEmpty()) {
            ZonedDateTime newStartDateTime = sessionDto.getStartDateTime();
            ZonedDateTime newEndDateTime = sessionDto.getEndDateTime();
            googleCalendarService.updateMeetingStartTime(
                extractEventIdFromLink(existingSession.getMeetingLink()),
                newStartDateTime,
                newEndDateTime
            );
        }
        return sessionMapper.convertEntityToDto(sessionRepository.save(existingSession));
    }

    private String extractEventIdFromLink(String meetingLink) {
        return meetingLink.split("/")[4];
    }
}
