package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.MeetingDto;
import com.appointment.booking.dto.MeetingParticipant;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import com.appointment.booking.entity.Student;
import com.appointment.booking.entity.Teacher;
import com.appointment.booking.enums.SessionStatus;
import com.appointment.booking.exceptions.SessionConflictException;
import com.appointment.booking.mapper.SessionMapper;
import com.appointment.booking.mapper.StudentMapper;
import com.appointment.booking.repository.SessionRepository;
import com.google.api.services.calendar.model.Event;
import java.math.BigDecimal;
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

    @Override
    public SessionDto add(SessionDto sessionDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Student student = (Student) authentication.getPrincipal();
        sessionDto.setStudent(studentMapper.convertEntityToDto(student));

        setDefaultValuesIfNeeded(sessionDto);

        validateSessionConflict(sessionDto);

        MeetingDto meetingDto = buildMeetingDto(sessionDto);
        Event event = googleCalendarService.createSimpleMeeting(meetingDto);
        sessionDto.setMeetingLink(event.getHangoutLink());

        return super.add(sessionDto);
    }

    public List<SessionDto> getCurrentUserSessions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        List<Session> sessions;
        if (principal instanceof Student student) {
            sessions = sessionRepository.findByStudentId(student.getId());
        } else if (principal instanceof Teacher teacher) {
            sessions = sessionRepository.findByTeacherId(teacher.getId());
        } else {
            throw new IllegalStateException("Unexpected user type: " + principal.getClass().getSimpleName());
        }

        return sessionMapper.convertEntitiesToDtos(sessions);
    }

    private void setDefaultValuesIfNeeded(SessionDto sessionDto) {
        if (sessionDto.getTitle() == null || sessionDto.getTitle().isEmpty()) {
            sessionDto.setTitle(String.format("%s session",
                sessionDto.getSubject().getName()
            ));
        }

        if (sessionDto.getDescription() == null || sessionDto.getDescription().isEmpty()) {
            sessionDto.setDescription(String.format(
                """
                    Session for subject '%s'.
                    """,
                sessionDto.getSubject().getName()
            ));
        }

        if (sessionDto.getDuration() == null) {
            sessionDto.setDuration(60L);
        }

        if (sessionDto.getPrice() == null) {
            sessionDto.setPrice(new BigDecimal(25));
        }

        if (sessionDto.getEndDateTime() == null) {
            sessionDto.setEndDateTime(sessionDto.getStartDateTime().plusMinutes(sessionDto.getDuration()));
        }

        if (sessionDto.getStatus() == null) {
            sessionDto.setStatus(SessionStatus.ACCEPTED_BY_TEACHER);
        }
    }


    private void validateSessionConflict(SessionDto sessionDto) {
        boolean conflictingSessionExists = sessionRepository.existsConflictingSession(
            sessionDto.getTeacher().getId(),
            sessionDto.getStudent().getId(),
            sessionDto.getStartDateTime(),
            sessionDto.getEndDateTime()
        );
        if (conflictingSessionExists) {
            throw new SessionConflictException("A conflicting session exists for either the teacher or the student during this time.");
        }
    }

    private MeetingDto buildMeetingDto(SessionDto sessionDto) {
        return MeetingDto.builder()
            .summary(sessionDto.getTitle())
            .description(sessionDto.getDescription())
            .startDate(sessionDto.getStartDateTime())
            .endDate(sessionDto.getEndDateTime())
            .participants(Set.of(
                MeetingParticipant.builder()
                    .email(sessionDto.getStudent().getEmail())
                    .displayName(String.format("%s %s",
                        sessionDto.getStudent().getFirstName(),
                        sessionDto.getStudent().getLastName()))
                    .build(),
                MeetingParticipant.builder()
                    .email(sessionDto.getTeacher().getEmail())
                    .displayName(String.format("%s %s",
                        sessionDto.getTeacher().getFirstName(),
                        sessionDto.getTeacher().getLastName()))
                    .build()
            ))
            .build();
    }
}
