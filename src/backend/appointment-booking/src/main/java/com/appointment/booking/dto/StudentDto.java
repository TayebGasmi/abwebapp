package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class StudentDto extends BaseDto<Long> implements Serializable {
    private Date yearOfStudy;
    private SchoolDto school;

}
