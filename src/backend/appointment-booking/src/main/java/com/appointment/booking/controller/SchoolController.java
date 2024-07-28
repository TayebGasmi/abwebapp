package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.SchoolDto;
import com.appointment.booking.entity.SchoolType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/school")
public class SchoolController extends BaseController<SchoolType,Long, SchoolDto> {
}
