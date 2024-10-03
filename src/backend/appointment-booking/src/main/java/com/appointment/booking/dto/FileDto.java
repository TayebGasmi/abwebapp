package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Set;

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
