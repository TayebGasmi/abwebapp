package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.TeacherDto;
import com.appointment.booking.entity.Teacher;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/teacher")
@RequiredArgsConstructor
@Tag(name = "Teacher")
@CrossOrigin
public class TeacherController extends BaseController <Teacher,Long, TeacherDto>{
}
