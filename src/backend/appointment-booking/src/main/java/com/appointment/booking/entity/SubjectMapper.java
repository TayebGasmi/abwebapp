package com.appointment.booking.entity;

import com.appointment.booking.base.BaseMapper;
import com.appointment.booking.dto.SubjectDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface SubjectMapper extends
    BaseMapper<Subject, SubjectDto> {

}