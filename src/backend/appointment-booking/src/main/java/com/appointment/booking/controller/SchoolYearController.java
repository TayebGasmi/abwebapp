package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.SchoolYearDto;
import com.appointment.booking.entity.SchoolYear;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/school-year")
@RequiredArgsConstructor
@Tag(name = "School Year")
@CrossOrigin
public class SchoolYearController extends BaseController<SchoolYear, Long, SchoolYearDto> {

}
