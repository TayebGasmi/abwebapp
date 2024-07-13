package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class CodeGeneratorDto extends BaseDto<Long> {

    @NotBlank
    @NotNull
    private String code;
    @NotBlank
    @NotNull
    private LocalDateTime expirationDate;

    private UserDto user;
}
