package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

/**
 * DTO for {@link com.appointment.booking.entity.SchoolYear}
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class SchoolYearDto extends BaseDto<Long> {
    String name;
    String description;
}