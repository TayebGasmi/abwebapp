package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.SubjectDto;
import com.appointment.booking.entity.Student;
import com.appointment.booking.entity.Subject;
import com.appointment.booking.entity.Teacher;
import com.appointment.booking.mapper.SubjectMapper;
import com.appointment.booking.repository.SubjectRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectService extends BaseServiceImpl<Subject, Long, SubjectDto> {

    private final SubjectRepository subjectRepository;
    private final SubjectMapper subjectMapper;

    public List<SubjectDto> getCurrent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        List<Subject> subjects;
        if (principal instanceof Student student) {
            subjects = subjectRepository.findBySchoolTypeNameAndSchoolYearName(student.getSchoolType().getName(),
                student.getSchoolYear().getName());
        } else if (principal instanceof Teacher teacher) {
            subjects = subjectRepository.findByTeachers_Email(teacher.getEmail());
        } else {
            throw new IllegalStateException("Unexpected user type: " + principal.getClass().getSimpleName());
        }
        return subjectMapper.convertEntitiesToDtos(subjects);

    }

    public List<SubjectDto> findBySchoolYearNameAndTypeName(String type,String year) {
        return subjectMapper.convertEntitiesToDtos(subjectRepository.findBySchoolTypeNameAndSchoolYearName(type, year));
    }
}
