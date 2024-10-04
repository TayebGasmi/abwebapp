package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class FileDto extends BaseDto<Long> {

    private String fileName;
    private String fileUrl;
    private UserDto user;
}
