package com.appointment.booking.service;

import com.appointment.booking.dto.MeetingDto;
import com.appointment.booking.exceptions.GoogleCalendarException;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
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
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GoogleCalendarServiceImpl implements GoogleCalendarService {

    private static final String CALENDAR_ID = "primary";
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
            String formattedStartDateTime = meetingDto.getStartDate()
                .withZoneSameInstant(ZoneOffset.UTC)
                .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
            String formattedEndDateTime = meetingDto.getEndDate()
                .withZoneSameInstant(ZoneOffset.UTC)
                .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
            EventDateTime start = new EventDateTime()
                .setDateTime(DateTime.parseRfc3339(formattedStartDateTime))
                .setTimeZone(meetingDto.getStartDate().getZone().toString());
            event.setStart(start);

            EventDateTime end = new EventDateTime()
                .setDateTime(DateTime.parseRfc3339(formattedEndDateTime))
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

            return calendar.events().insert(CALENDAR_ID, event)
                .setConferenceDataVersion(1)
                .setSendNotifications(true)
                .setSendUpdates("all")
                .execute();

        } catch (IOException e) {
            log.error("Failed to create a Google Calendar event", e);
            throw new GoogleCalendarException("Failed to create a Google Calendar event", e);
        }
    }

    @Override
    public Event updateMeetingStartTime(String eventId, ZonedDateTime newStartDateTime, ZonedDateTime newEndDateTime) {
        try {
            Event event = calendar.events().get(CALENDAR_ID, eventId).execute();

            String formattedStartDateTime = newStartDateTime
                .withZoneSameInstant(ZoneOffset.UTC)
                .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
            String formattedEndDateTime = newEndDateTime
                .withZoneSameInstant(ZoneOffset.UTC)
                .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

            EventDateTime start = new EventDateTime()
                .setDateTime(DateTime.parseRfc3339(formattedStartDateTime))
                .setTimeZone(newStartDateTime.getZone().toString());
            event.setStart(start);

            EventDateTime end = new EventDateTime()
                .setDateTime(DateTime.parseRfc3339(formattedEndDateTime))
                .setTimeZone(newEndDateTime.getZone().toString());
            event.setEnd(end);

            return calendar.events().update(CALENDAR_ID, event.getId(), event)
                .setConferenceDataVersion(1)
                .setSendNotifications(true)
                .setSendUpdates("all")
                .execute();

        } catch (IOException e) {
            log.error("Failed to update the Google Calendar event start time", e);
            throw new GoogleCalendarException("Failed to update the Google Calendar event start time", e);
        }
    }

    @Override
    public void deleteEvent(String eventId) {
        try {
            calendar.events().delete(CALENDAR_ID, eventId).execute();
        } catch (IOException e) {
            log.error("Failed to delete the Google Calendar event", e);
            throw new GoogleCalendarException("Failed to delete the Google Calendar event", e);
        }
    }
}
