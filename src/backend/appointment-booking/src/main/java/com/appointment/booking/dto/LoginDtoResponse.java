package com.appointment.booking.dto;

import com.appointment.booking.enums.RoleType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginDtoResponse {

    @NotNull
    @NotBlank
    private String accessToken;
    private String refreshToken;
    private Set<RoleType> roles;
}
