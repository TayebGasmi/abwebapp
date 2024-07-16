package com.appointment.booking.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Oauth2Dto {
    private String idToken;
    private String oauthProvider;
}
