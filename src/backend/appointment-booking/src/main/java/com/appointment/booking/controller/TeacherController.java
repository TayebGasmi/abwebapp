package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.TeacherDto;
import com.appointment.booking.entity.Teacher;
import com.appointment.booking.service.TeacherService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teacher")
@RequiredArgsConstructor
@Tag(name = "Teacher")
@CrossOrigin
public class TeacherController extends BaseController<Teacher, Long, TeacherDto> {

    private final TeacherService teacherService;

    @GetMapping("/subject/{name}")
    ResponseEntity<List<TeacherDto>> getTeacherBySubjectName(@PathVariable String name) {
        return ResponseEntity.ok(teacherService.findTeacherBySubject(name));
    }
}
