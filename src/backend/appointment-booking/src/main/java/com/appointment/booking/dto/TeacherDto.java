package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.appointment.booking.entity.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Value;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

/**
 * DTO for {@link com.appointment.booking.entity.Teacher}
 */
@Data
@SuperBuilder
public class TeacherDto extends BaseDto<Long> {
    String firstName;
    String lastName;
    String profilePicture;
    String email;
    Boolean isVerified;
    RoleDTO role;
    @NotNull
    BigDecimal payRate;
    Set<SubjectDto> subjects;
}