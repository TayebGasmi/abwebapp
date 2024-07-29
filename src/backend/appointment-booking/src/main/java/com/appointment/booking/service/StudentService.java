package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.StudentDto;
import com.appointment.booking.entity.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService extends BaseServiceImpl<Student, Long, StudentDto> {

}
