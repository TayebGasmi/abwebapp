package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.appointment.booking.entity.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Set;

/**
 * DTO for {@link com.appointment.booking.entity.Student}
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto extends BaseDto<Long> {
    String firstName;
    String lastName;
    String profilePicture;
    String email;
    Boolean isVerified;
    RoleDTO  role;
    SchoolTypeDto schoolType;
    SchoolYearDto schoolYear;
    Set<SessionDto> sessions;
}