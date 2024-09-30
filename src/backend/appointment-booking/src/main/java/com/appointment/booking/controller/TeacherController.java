package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.TeacherDto;
import com.appointment.booking.entity.Teacher;
import com.appointment.booking.service.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.ZonedDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teacher")
@RequiredArgsConstructor
@Tag(name = "Teacher")
@CrossOrigin
public class TeacherController extends BaseController<Teacher, Long, TeacherDto> {

    private final TeacherService teacherService;

    @Operation(summary = "Get available teachers by subject and time", description = "Find teachers for a subject who have no session between the given start and end time.")
    @GetMapping("/available")
    public ResponseEntity<List<TeacherDto>> findAvailableTeachers(
        @RequestParam String subjectName,
        @RequestParam ZonedDateTime startDateTime) {
        List<TeacherDto> availableTeachers = teacherService.findAvailableTeachersBySubjectAndTime(subjectName, startDateTime);
        return ResponseEntity.ok(availableTeachers);
    }
}
