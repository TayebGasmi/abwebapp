package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class TeacherDto extends BaseDto<Long> implements Serializable {
    private String school;
}
