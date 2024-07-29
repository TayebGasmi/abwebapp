package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.appointment.booking.enums.RoleType;
import io.swagger.v3.oas.annotations.media.Schema;
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

    private String name;

}
