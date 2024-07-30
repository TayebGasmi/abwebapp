package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.SchoolTypeDto;
import com.appointment.booking.entity.SchoolType;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schooltype")
@RequiredArgsConstructor
@Tag(name = "School Type")
@CrossOrigin
public class SchoolTypeController extends BaseController<SchoolType, Long, SchoolTypeDto> {

}
