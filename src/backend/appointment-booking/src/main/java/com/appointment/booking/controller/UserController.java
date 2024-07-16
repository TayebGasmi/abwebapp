package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.User;
import com.appointment.booking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController extends BaseController<User, Long, UserDto> {
    @Value("${angular.server.url}")
    private String frontUrl;

    private final UserService userService;

    @GetMapping("/verify")
    public ResponseEntity verifyEmail(@RequestParam String email, @RequestParam String code) {
        userService.verifyEmail(email, code);
        // Replace with the actual path to your front-end
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
