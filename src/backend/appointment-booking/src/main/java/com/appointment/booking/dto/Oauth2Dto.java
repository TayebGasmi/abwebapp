package com.appointment.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Oauth2Dto {

    @NotNull
    @NotBlank
    private String idToken;
    @NotNull
    @NotBlank
    private String oauthProvider;
}
