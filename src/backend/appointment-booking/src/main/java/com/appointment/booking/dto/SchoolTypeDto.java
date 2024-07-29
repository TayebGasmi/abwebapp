package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

/**
 * DTO for {@link com.appointment.booking.entity.SchoolType}
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class SchoolTypeDto extends BaseDto<Long> {
    @NotNull
    @NotEmpty
    String name;
    @NotNull
    @NotEmpty
    String description;
}