package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class TeacherDto extends BaseDto<Long> implements Serializable {
    private UserDto userDto;
    private Set<Integer> teachingYears;
    private SchoolDto school;
}
