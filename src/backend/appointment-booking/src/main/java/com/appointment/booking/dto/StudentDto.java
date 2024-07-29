package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.Data;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link com.appointment.booking.entity.Student}
 */
@Data
@SuperBuilder
public class StudentDto extends BaseDto<Long> {

    @NotNull
    private UserDto user;
    @NotNull
    private SchoolTypeDto schoolType;
    @NotNull
    private SchoolYearDto schoolYear;
    @NotNull
    private Set<SessionDto> sessions;
}