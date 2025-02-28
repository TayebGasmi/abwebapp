package com.appointment.booking.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link com.appointment.booking.entity.Teacher}
 */
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class TeacherDto extends UserDto {

    private BigDecimal payRate;
    @NotNull
    private Set<SubjectDto> subjects;
    @NotNull
    private boolean confirmedByAdmin = false;

}