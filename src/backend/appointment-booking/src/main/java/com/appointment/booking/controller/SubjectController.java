package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.SubjectDto;
import com.appointment.booking.entity.Subject;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subject")
@RequiredArgsConstructor
public class SubjectController extends BaseController<Subject, Long, SubjectDto> {


}
