package com.appointment.booking.utils;

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
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class GoogleCalendarUtil {

    private final JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
    private final Calendar calendar;

    public GoogleCalendarUtil() throws IOException, GeneralSecurityException {
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

    public Event createSimpleMeeting(String teacherEmail, String studentEmail,
        String summary, String description,
        String startDateTime, String endDateTime) throws IOException {

        Event event = new Event()
            .setSummary(summary)
            .setDescription(description);

        EventDateTime start = new EventDateTime()
            .setDateTime(new com.google.api.client.util.DateTime(startDateTime))
            .setTimeZone("America/Los_Angeles");
        event.setStart(start);

        EventDateTime end = new EventDateTime()
            .setDateTime(new com.google.api.client.util.DateTime(endDateTime))
            .setTimeZone("America/Los_Angeles");
        event.setEnd(end);
        event.setVisibility("private");
        List<EventAttendee> attendees = List.of(
            new EventAttendee().setEmail(teacherEmail)

            ,
            new EventAttendee().setEmail(studentEmail)
        );
        event.setAttendees(attendees);

        ConferenceData conferenceData = new ConferenceData()
            .setCreateRequest(new CreateConferenceRequest()
                .setRequestId("meet-" + System.currentTimeMillis())
                .setConferenceSolutionKey(new ConferenceSolutionKey().setType("hangoutsMeet")));
        event.setConferenceData(conferenceData);

        Event createdEvent = calendar.events().insert("primary", event)
            .setConferenceDataVersion(1)
            .execute();

        log.info("Event created with Google Meet link: {}", createdEvent.getHangoutLink());
        return createdEvent;
    }

    @PostConstruct
    void init() throws IOException {
        createSimpleMeeting(
            "tayebgasmi1999@gmail.com",
            "student@example.com",
            "Lesson with Teacher",
            "Math lesson",
            "2024-07-20T10:00:00-07:00",
            "2024-07-20T11:00:00-07:00"
        );
    }
}
