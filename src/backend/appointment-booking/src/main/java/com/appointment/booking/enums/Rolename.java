package com.appointment.booking.enums;

public enum Rolename {
    ADMIN("admin"), STUDENT("student"),TEACHER("teacher");
    private String value;

    Rolename(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
