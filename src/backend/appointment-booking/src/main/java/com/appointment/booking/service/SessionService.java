package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.MeetingDto;
import com.appointment.booking.dto.MeetingParticipant;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import com.appointment.booking.entity.Student;
import com.appointment.booking.enums.SessionStatus;
import com.appointment.booking.exceptions.SessionConflictException;
import com.appointment.booking.mapper.StudentMapper;
import com.appointment.booking.repository.SessionRepository;
import com.google.api.services.calendar.model.Event;
import java.math.BigDecimal;
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

    @Override
    public SessionDto add(SessionDto sessionDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Student student = (Student) authentication.getPrincipal();
        sessionDto.setStudent(studentMapper.convertEntityToDto(student));
        if (sessionDto.getTitle() == null || sessionDto.getTitle().isEmpty()) {
            sessionDto.setTitle("Default Session Title");
        }
        if (sessionDto.getDescription() == null || sessionDto.getDescription().isEmpty()) {
            sessionDto.setDescription("No description provided.");
        }
        sessionDto.setDuration(60L);
        sessionDto.setEndDateTime(sessionDto.getStartDateTime().plusMinutes(60));
        sessionDto.setPrice(new BigDecimal(25));
        sessionDto.setStatus(SessionStatus.ACCEPTED_BY_TEACHER);
        if (sessionRepository.existsConflictingSession(
            sessionDto.getTeacher().getId(),
            sessionDto.getStudent().getId(),
            sessionDto.getStartDateTime(),
            sessionDto.getEndDateTime()
        )) {
            throw new SessionConflictException("A conflicting session exists for either the teacher or the student during this time.");
        }
        MeetingDto meetingDto = MeetingDto.builder()
            .summary(sessionDto.getTitle())
            .description(sessionDto.getDescription())
            .startDate(sessionDto.getStartDateTime())
            .endDate(sessionDto.getStartDateTime().plusMinutes(60))
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
        Event event = googleCalendarService.createSimpleMeeting(meetingDto);
        sessionDto.setMeetingLink(event.getHangoutLink());
        return super.add(sessionDto);
    }
}
