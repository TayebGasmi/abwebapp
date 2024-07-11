package com.appointment.booking.mapper;

import com.appointment.booking.base.BaseMapper;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface  UserMapper extends BaseMapper<User, UserDto> {

}
