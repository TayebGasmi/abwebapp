package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RoleDTO extends BaseDto<Long> {
    @NotBlank
    @NotNull
    private String name;
}
