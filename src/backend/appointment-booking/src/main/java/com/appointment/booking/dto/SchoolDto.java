package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.io.Serializable;
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class SchoolDto extends BaseDto<Long> implements Serializable {
    private String name;
    private String type;
}
