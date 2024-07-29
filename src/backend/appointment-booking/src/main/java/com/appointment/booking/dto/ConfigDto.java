package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.appointment.booking.entity.Config;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link Config}
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ConfigDto extends BaseDto<Long> implements Serializable {

    @NotNull
    @NotBlank
    String key;
    @NotNull
    @NotBlank
    String value;
    @NotNull
    @NotBlank
    String description;
}