package com.appointment.booking.controller;

import com.appointment.booking.model.User;
import com.appointment.booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/usersmanagement")
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping("/userAdd")
    public ResponseEntity<?> addUser(@RequestBody User user) throws IOException {
        userService.save(user);
        return new ResponseEntity<>(userService.save(user).getEmail(), HttpStatus.OK);
    }
}
