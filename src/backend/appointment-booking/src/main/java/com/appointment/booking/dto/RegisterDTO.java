package com.appointment.booking.dto;

import com.appointment.booking.enums.RoleType;
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
public class RegisterDTO {

    @NotBlank
    @NotNull
    private String email;
    @NotBlank
    @NotNull
    private String password;
    @NotNull
    private RoleType role;

}
