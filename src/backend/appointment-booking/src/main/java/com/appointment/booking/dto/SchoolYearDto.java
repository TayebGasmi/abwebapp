package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import lombok.Data;
import lombok.Value;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

/**
 * DTO for {@link com.appointment.booking.entity.SchoolYear}
 */
@Data
@SuperBuilder
public class SchoolYearDto extends BaseDto<Long> {
    String name;
    String description;
}