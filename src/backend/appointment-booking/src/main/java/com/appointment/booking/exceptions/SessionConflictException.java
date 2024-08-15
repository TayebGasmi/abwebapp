package com.appointment.booking.exceptions;

public class SessionConflictException extends RuntimeException {

    public SessionConflictException(String message) {
        super(message);
    }
}
