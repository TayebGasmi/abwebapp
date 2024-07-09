package com.appointment.booking.controller;
import com.appointment.booking.dto.JwtRequest;
import com.appointment.booking.dto.JwtResponse;
import com.appointment.booking.enums.Rolename;
import com.appointment.booking.model.Role;
import com.appointment.booking.model.User;
import com.appointment.booking.security.UserDetailsServiceImpl;
import com.appointment.booking.security.jwt.JwtProvider;
import com.appointment.booking.service.RoleService;
import com.appointment.booking.service.UserService;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Value("${google.clientId}")
    String googleClientId;

    @Value("${secretPsw}")
    String secretPsw;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtProvider jwtTokenUtil;
    @Autowired
    private RoleService roleService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        try {
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        } catch (AuthenticationException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails.getUsername(), Arrays.asList(userDetails.getAuthorities().toArray()));

        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
    @PostMapping("/oauth")
    public ResponseEntity<?> google(@RequestBody JwtResponse tokenDto) throws IOException {
        final NetHttpTransport transport = new NetHttpTransport();
        final JacksonFactory jacksonFactory = JacksonFactory.getDefaultInstance();
        GoogleIdTokenVerifier.Builder verifier =
                new GoogleIdTokenVerifier.Builder(transport, jacksonFactory)
                        .setAudience(Collections.singletonList(googleClientId));
        final GoogleIdToken googleIdToken = GoogleIdToken.parse(verifier.getJsonFactory(), tokenDto.getValue());
        final GoogleIdToken.Payload payload = googleIdToken.getPayload();
        User user;
        if(userService.existsEmail(payload.getSubject()))
            user = userService.getByEmail(payload.getSubject()).get();
        else
            user = saveUser(payload.getEmail());
        JwtResponse tokenRes = login(user);
        return new ResponseEntity(tokenRes, HttpStatus.OK);
    }

    private User saveUser(String email){
        User user = new User(email, passwordEncoder.encode(secretPsw));
        Role rolUser = roleService.getByRolName(Rolename.ADMIN).get();
        user.setRole(rolUser);
        return userService.save(user);
    }

    private JwtResponse login(User user){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), secretPsw)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenUtil.generateToken(user.getEmail(),Arrays.asList(user.getRole()));
        JwtResponse tokenDto = new JwtResponse(jwt);
        return tokenDto;
    }
}
