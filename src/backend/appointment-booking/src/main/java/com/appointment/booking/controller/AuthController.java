package com.appointment.booking.controller;

import com.appointment.booking.dto.LoginDTO;
import com.appointment.booking.dto.Oauth2Dto;
import com.appointment.booking.dto.RegisterDTO;
import com.appointment.booking.dto.TokenDtoResponse;
import com.appointment.booking.exceptions.ExistException;
import com.appointment.booking.service.AuthService;
import com.nimbusds.jose.JOSEException;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import java.text.ParseException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO registerDTO) throws MessagingException, ExistException {
        authService.register(registerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDtoResponse> login(@RequestBody @Valid LoginDTO loginDTO) {
        return ResponseEntity.ok(authService.login(loginDTO));
    }

    //todo: add google login
    @PostMapping("/googlelogin")
    public ResponseEntity<TokenDtoResponse> loginGoogle(@RequestBody @Valid Oauth2Dto oauth2Dto) throws ParseException, JOSEException {
        return ResponseEntity.ok(authService.sigInWithGoogle(oauth2Dto));
    }
}
