package com.appointment.booking.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link com.appointment.booking.entity.Student}
 */
@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StudentDto extends UserDto {

    @NotNull
    private SchoolTypeDto schoolType;
    @NotNull
    private SchoolYearDto schoolYear;

    @JsonCreator
    public StudentDto(@JsonProperty("schoolType") SchoolTypeDto schoolType,
        @JsonProperty("schoolYear") SchoolYearDto schoolYear) {
        this.schoolType = schoolType;
        this.schoolYear = schoolYear;
    }

}