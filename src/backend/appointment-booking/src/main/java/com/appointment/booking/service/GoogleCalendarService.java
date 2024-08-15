package com.appointment.booking.service;

import com.appointment.booking.dto.MeetingDto;
import com.google.api.services.calendar.model.Event;
import jakarta.validation.Valid;

public interface GoogleCalendarService {

    Event createSimpleMeeting(@Valid MeetingDto meetingDto);
}
