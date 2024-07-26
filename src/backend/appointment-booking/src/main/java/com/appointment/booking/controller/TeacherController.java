package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.TeacherDto;
import com.appointment.booking.entity.Teacher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/teacher")
public class TeacherController extends BaseController <Teacher,Long, TeacherDto>{
}
