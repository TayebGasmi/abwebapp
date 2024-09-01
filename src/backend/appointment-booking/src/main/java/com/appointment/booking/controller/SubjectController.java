package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.SubjectDto;
import com.appointment.booking.entity.Subject;
import com.appointment.booking.service.SubjectService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subject")
@RequiredArgsConstructor
@Tag(name = "Subject")
@CrossOrigin
public class SubjectController extends BaseController<Subject, Long, SubjectDto> {

    private final SubjectService subjectService;

    @GetMapping("/current")
    ResponseEntity<List<SubjectDto>> getCurrent() {
        return ResponseEntity.ok(subjectService.getCurrent());
    }   

}
