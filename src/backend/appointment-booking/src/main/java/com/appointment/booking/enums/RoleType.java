package com.appointment.booking.enums;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum RoleType {
    ADMIN("admin"), STUDENT("student"), TEACHER("teacher");
    private final String value;

    @Override
    public String toString() {
        return value;
    }
}
