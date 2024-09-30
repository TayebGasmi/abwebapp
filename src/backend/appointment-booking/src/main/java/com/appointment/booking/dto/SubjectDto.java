package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link com.appointment.booking.entity.Subject}
 */
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Schema
public class SubjectDto extends BaseDto<Long> {

    @NotNull
    @NotBlank
    private String name;

    private String description;
    @NotNull
    @NotEmpty
    private Set<SchoolTypeDto> schoolTypes;
    @NotNull
    @NotEmpty
    private Set<SchoolYearDto> schoolYears;


}