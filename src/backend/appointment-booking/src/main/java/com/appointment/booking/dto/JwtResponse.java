package com.appointment.booking.dto;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private final String jwtToken;

    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }
    // constructor, getters

    public String getJwtToken() {
        return jwtToken;
    }
}