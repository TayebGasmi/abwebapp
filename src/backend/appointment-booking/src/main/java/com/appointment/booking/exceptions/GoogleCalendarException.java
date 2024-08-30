package com.appointment.booking.exceptions;

public class GoogleCalendarException extends RuntimeException {

    public GoogleCalendarException(String message, Exception e) {
        super(message, e);
    }
}
