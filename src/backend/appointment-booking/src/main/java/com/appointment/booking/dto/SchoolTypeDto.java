package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link com.appointment.booking.entity.SchoolType}
 */
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Schema
@EqualsAndHashCode(callSuper = true)
public class SchoolTypeDto extends BaseDto<Long> {

    @NotNull
    @NotEmpty
    private String name;

    private String description;

}