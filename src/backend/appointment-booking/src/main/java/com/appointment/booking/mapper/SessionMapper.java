package com.appointment.booking.mapper;

import com.appointment.booking.base.BaseMapper;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.dto.SessionMetadataDto;
import com.appointment.booking.entity.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {StudentMapper.class,
    TeacherMapper.class,
    SubjectMapper.class})
public interface SessionMapper extends BaseMapper<Session, SessionDto> {

    @Mapping(source = "teacherId", target = "teacher.id")
    @Mapping(source = "teacherFirstName", target = "teacher.firstName")
    @Mapping(source = "teacherLastName", target = "teacher.lastName")
    @Mapping(source = "teacherEmail", target = "teacher.email")

    @Mapping(source = "studentId", target = "student.id")
    @Mapping(source = "studentFirstName", target = "student.firstName")
    @Mapping(source = "studentLastName", target = "student.lastName")
    @Mapping(source = "studentEmail", target = "student.email")

    @Mapping(source = "subjectId", target = "subject.id")
    @Mapping(source = "subjectName", target = "subject.name")
    SessionDto ConvertMetaDataToDto(SessionMetadataDto metadataDto);

    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "teacher.firstName", target = "teacherFirstName")
    @Mapping(source = "teacher.lastName", target = "teacherLastName")
    @Mapping(source = "teacher.email", target = "teacherEmail")

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.firstName", target = "studentFirstName")
    @Mapping(source = "student.lastName", target = "studentLastName")
    @Mapping(source = "student.email", target = "studentEmail")

    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "subject.name", target = "subjectName")
    SessionMetadataDto ConvertDtoToMetadataDto(SessionDto sessionDto);

}
