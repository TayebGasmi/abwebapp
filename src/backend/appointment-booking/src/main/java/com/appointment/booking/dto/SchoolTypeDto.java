package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Value;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

/**
 * DTO for {@link com.appointment.booking.entity.SchoolType}
 */
@Data
@SuperBuilder
public class SchoolTypeDto extends BaseDto<Long> {
    @NotNull
    @NotEmpty
    String name;
    @NotNull
    @NotEmpty
    String description;
}