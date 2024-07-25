package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import lombok.Data;

/**
 * DTO for {@link com.appointment.booking.entity.Subject}
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class SubjectDto extends BaseDto<Long> implements Serializable {

    @NotNull
    @NotBlank
    String name;
    @NotNull
    @NotBlank
    String description;
}