package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor

@Schema
public class RoleDTO extends BaseDto<Long> {

    @NotBlank
    @NotNull
    private String name;

}
