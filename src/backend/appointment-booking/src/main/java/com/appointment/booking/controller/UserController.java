package com.appointment.booking.controller;

import com.appointment.booking.crud.CrudController;
import com.appointment.booking.crud.CrudService;
import com.appointment.booking.model.User;
import com.appointment.booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/usersmanagement")
@CrossOrigin
public class UserController extends CrudController<User,Long> {
    @Autowired
    UserService userService;

    protected UserController(CrudService<User, Long> service) {
        super(service);
    }

    @PostMapping("/userAdd")
    public ResponseEntity<?> addUser(@RequestBody User user) throws IOException {
        userService.save(user);
        return new ResponseEntity<>(userService.save(user).getEmail(), HttpStatus.OK);
    }
}
