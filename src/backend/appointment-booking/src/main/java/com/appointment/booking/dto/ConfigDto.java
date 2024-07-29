package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.appointment.booking.entity.Config;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link Config}
 */
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConfigDto extends BaseDto<Long> implements Serializable {

    @NotNull
    @NotBlank
    private String key;
    @NotNull
    @NotBlank
    private String value;
    @NotNull
    @NotBlank
    private String description;
}