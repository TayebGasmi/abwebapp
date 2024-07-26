package com.appointment.booking.mapper;

import com.appointment.booking.base.BaseMapper;
import com.appointment.booking.dto.SchoolDto;
import com.appointment.booking.entity.School;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface SchoolMapper extends BaseMapper<School, SchoolDto> {
}
