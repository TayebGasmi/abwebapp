package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Set;

/**
 * DTO for {@link com.appointment.booking.entity.Subject}
 */
@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDto extends BaseDto<Long> {
    String name;
    String description;
    @NotNull
    Set<SchoolTypeDto> schoolTypes;
    Set<SchoolYearDto> schoolYears;
}