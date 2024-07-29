package com.appointment.booking.mapper;

import com.appointment.booking.base.BaseMapper;
import com.appointment.booking.dto.TeacherDto;
import com.appointment.booking.entity.Teacher;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {SubjectMapper.class,
    SessionMapper.class})
public interface TeacherMapper extends BaseMapper<Teacher, TeacherDto> {

}
