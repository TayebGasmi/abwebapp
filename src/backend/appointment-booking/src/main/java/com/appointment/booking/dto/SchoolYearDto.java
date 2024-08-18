package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link com.appointment.booking.entity.SchoolYear}
 */
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class SchoolYearDto extends BaseDto<Long> {

    @NotBlank
    @NotNull
    private String name;
    @NotBlank
    @NotNull
    private String description;


}