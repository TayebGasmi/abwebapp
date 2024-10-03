package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.ConfigDto;
import com.appointment.booking.dto.TeacherDto;
import com.appointment.booking.entity.Teacher;
import com.appointment.booking.mapper.TeacherMapper;
import com.appointment.booking.repository.TeacherRepository;
import com.appointment.booking.utils.ConfigKeyConstants;
import java.time.ZonedDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherService extends BaseServiceImpl<Teacher, Long, TeacherDto> {

    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;
    private final ConfigService configService;

    public List<TeacherDto> findAvailableTeachersBySubjectAndTime(String subject, ZonedDateTime start) {
        Long sessionDuration = configService.getConfigDtoByKey(ConfigKeyConstants.SESSION_DURATION).map(ConfigDto::getValue).map(Long::parseLong)
            .orElse(60L);
        ZonedDateTime end = start.plusMinutes(sessionDuration);
        return teacherMapper.convertEntitiesToDtos(
            teacherRepository.findAvailableTeachersBySubjectAndTime(subject, start, end)
        );
    }
}
