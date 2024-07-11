package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.appointment.booking.base.BaseMapper;
import com.appointment.booking.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto extends BaseDto<Long> {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}
