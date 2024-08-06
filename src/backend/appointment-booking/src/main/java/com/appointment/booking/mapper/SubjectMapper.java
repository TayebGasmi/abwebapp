package com.appointment.booking.mapper;

import com.appointment.booking.base.BaseMapper;
import com.appointment.booking.dto.SubjectDto;
import com.appointment.booking.entity.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING, uses = {SchoolTypeMapper.class, SchoolYearMapper.class})
public interface SubjectMapper extends
    BaseMapper<Subject, SubjectDto> {

}