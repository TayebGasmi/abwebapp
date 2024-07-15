package com.appointment.booking.dto;

import com.appointment.booking.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {

    private String email;
    private String password;
    private RoleType role;

}
