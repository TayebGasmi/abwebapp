package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.MeetingDto;
import com.appointment.booking.dto.MeetingParticipant;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import com.appointment.booking.exceptions.SessionConflictException;
import com.appointment.booking.repository.SessionRepository;
import com.google.api.services.calendar.model.Event;
import java.io.IOException;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SessionService extends BaseServiceImpl<Session, Long, SessionDto> {


    private final GoogleCalendarService googleCalendarService;
    private final SessionRepository sessionRepository;

    @Override
    public SessionDto add(SessionDto sessionDto) throws IOException {
        if (sessionRepository.existsConflictingSession(
            sessionDto.getTeacher().getId(),
            sessionDto.getStudent().getId(),
            sessionDto.getStartTime(),
            sessionDto.getStartTime().plusMinutes(sessionDto.getDuration())
        )) {
            throw new SessionConflictException("A conflicting session exists for either the teacher or the student during this time.");
        }
        MeetingDto meetingDto = MeetingDto.builder()
            .summary(sessionDto.getTitle())
            .description(sessionDto.getDescription())
            .startDate(sessionDto.getStartTime())
            .endDate(sessionDto.getStartTime().plusMinutes(sessionDto.getDuration()))
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
