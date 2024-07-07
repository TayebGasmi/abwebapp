package com.appointment.booking.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private  String value;

    public JwtResponse(@JsonProperty("value") String value) {
        this.value = value;
    }
    // constructor, getters
    public void setValue(String value) {
        this.value = value;
    }
    public String getValue() {
        return value;
    }
}