package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.TeacherDto;
import com.appointment.booking.entity.Teacher;
import com.appointment.booking.mapper.TeacherMapper;
import com.appointment.booking.repository.TeacherRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherService extends BaseServiceImpl<Teacher, Long, TeacherDto> {

    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;

    public List<TeacherDto> findTeacherBySubject(String subject) {
        return teacherMapper.convertEntitiesToDtos(
            teacherRepository.findTeachersBySubjectName(subject)
        );
    }
}
