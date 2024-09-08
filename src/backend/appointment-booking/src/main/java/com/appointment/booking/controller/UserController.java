package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.TeacherDto;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.User;
import com.appointment.booking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController extends BaseController<User, Long, UserDto> {


    private final UserService userService;

    @GetMapping("/verify")
    public ResponseEntity verifyEmail(@RequestParam String email, @RequestParam String code) {
        userService.verifyEmail(email, code);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/details")
    public ResponseEntity<UserDto> getUserDetails(@AuthenticationPrincipal User principal) {
        return ResponseEntity.ok(userService.getUserDetails(principal));
    }

    @PostMapping("/confirm-teacher")
    public ResponseEntity<TeacherDto> getUserDetails(@RequestBody TeacherDto teacherDto) {
        return ResponseEntity.ok(userService.confirmTeacher(teacherDto));
    }
}
