package com.appointment.booking.service;

import com.appointment.booking.dto.MeetingDto;
import com.appointment.booking.exceptions.GoogleCalendarException;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.ConferenceData;
import com.google.api.services.calendar.model.ConferenceSolutionKey;
import com.google.api.services.calendar.model.CreateConferenceRequest;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventAttendee;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.EventReminder;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GoogleCalendarServiceImpl implements GoogleCalendarService {

    private final JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
    private final Calendar calendar;

    public GoogleCalendarServiceImpl() throws IOException, GeneralSecurityException {
        this.calendar = createCalendarService();
    }

    private Calendar createCalendarService() throws GeneralSecurityException, IOException {
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault()
            .createScoped(Collections.singleton(CalendarScopes.CALENDAR)).createDelegated(
                "tayeb@doowi.eu"
            );
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(credentials);

        return new Calendar.Builder(
            GoogleNetHttpTransport.newTrustedTransport(),
            jsonFactory,
            requestInitializer
        ).setApplicationName("appointment-booking").build();
    }

    @Override
    public Event createSimpleMeeting(MeetingDto meetingDto) {
        try {
            Event event = new Event()
                .setSummary(meetingDto.getSummary())
                .setDescription(meetingDto.getDescription())
                .setVisibility("private")
                .setAnyoneCanAddSelf(false);

            EventDateTime start = new EventDateTime()
                .setDateTime(new com.google.api.client.util.DateTime(meetingDto.getStartDate().toString()))
                .setTimeZone(meetingDto.getStartDate().getZone().toString());
            event.setStart(start);

            EventDateTime end = new EventDateTime()
                .setDateTime(new com.google.api.client.util.DateTime(meetingDto.getEndDate().toString()))
                .setTimeZone(meetingDto.getEndDate().getZone().toString());
            event.setEnd(end);

            List<EventAttendee> attendees = meetingDto.getParticipants().stream()
                .map(participant -> new EventAttendee().setEmail(participant.getEmail())
                    .setDisplayName(participant.getDisplayName())
                )
                .toList();
            event.setAttendees(attendees);

            ConferenceData conferenceData = new ConferenceData()
                .setCreateRequest(new CreateConferenceRequest()
                    .setRequestId("meet-" + System.currentTimeMillis())
                    .setConferenceSolutionKey(new ConferenceSolutionKey().setType("hangoutsMeet")));
            event.setConferenceData(conferenceData);

            Event.Reminders reminders = new Event.Reminders()
                .setUseDefault(false)
                .setOverrides(List.of(
                    new EventReminder().setMethod("email").setMinutes(10),
                    new EventReminder().setMethod("popup").setMinutes(10)
                ));
            event.setReminders(reminders);

            return calendar.events().insert("primary", event)
                .setConferenceDataVersion(1)
                .setSendNotifications(true)
                .setSendUpdates("all")
                .execute();

        } catch (IOException e) {
            log.error("Failed to create a Google Calendar event", e);
            throw new GoogleCalendarException("Failed to create a Google Calendar event", e);
        }
    }
}
