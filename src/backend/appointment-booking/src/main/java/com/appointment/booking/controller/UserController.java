package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.User;
import com.appointment.booking.mapper.UserMapper;
import com.appointment.booking.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserController extends BaseController<User,Long, UserDto> {

    private final UserService userService;
    private final UserMapper userMapper;
    @GetMapping("/verify/{email}/{code}")
    public ResponseEntity<String> verifyCode(@PathVariable String email,@PathVariable String code) throws Exception {
        boolean isVerified = userService.verifyCodeUser(email,code);

        if (isVerified) {
            userService.enableUser(email);
            return ResponseEntity.ok("Verification successful");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification code or expired");
        }
    }
}
