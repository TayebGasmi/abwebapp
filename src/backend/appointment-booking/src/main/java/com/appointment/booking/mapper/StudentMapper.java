package com.appointment.booking.mapper;

import com.appointment.booking.base.BaseMapper;
import com.appointment.booking.dto.SchoolDto;
import com.appointment.booking.dto.StudentDto;
import com.appointment.booking.entity.School;
import com.appointment.booking.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface StudentMapper extends BaseMapper<Student, StudentDto> {
}
