package com.appointment.booking.controller;
import com.appointment.booking.dto.JwtRequest;
import com.appointment.booking.dto.JwtResponse;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.mapper.UserMapper;
import com.appointment.booking.enums.RoleName;
import com.appointment.booking.entity.Role;
import com.appointment.booking.entity.User;
import com.appointment.booking.security.UserDetailsServiceImpl;
import com.appointment.booking.security.jwt.JwtProvider;
import com.appointment.booking.service.RoleService;
import com.appointment.booking.service.UserService;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
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

import java.util.*;

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
    @Autowired
    private UserMapper userMapper;
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
    public ResponseEntity<?> google(@RequestBody JwtResponse tokenDto) throws Exception {
        final NetHttpTransport transport = new NetHttpTransport();
        final JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                .setAudience(Collections.singletonList(googleClientId))
                .build();
        final GoogleIdToken googleIdToken = GoogleIdToken.parse(verifier.getJsonFactory(), tokenDto.getValue());
        final GoogleIdToken.Payload payload = googleIdToken.getPayload();
        User user;
        if(userService.existsEmail(payload.getEmail()))
            user = userService.getByEmail(payload.getEmail()).get();
        else
            user = userMapper.convertDtoToEntity(saveUser(payload.getEmail()));
        JwtResponse tokenRes = login(user);
        return new ResponseEntity(tokenRes, HttpStatus.OK);
    }

    private UserDto saveUser(String email) throws Exception {

        User user = new User(email, passwordEncoder.encode(secretPsw));
        Role rolUser = roleService.findByName(RoleName.ADMIN).get();
        Set<Role> roles = new HashSet<>();
        roles.add(rolUser);
        user.setRoles(roles);
        return userService.add(userMapper.convertEntityToDto(user));
    }

    private JwtResponse login(User user){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), secretPsw)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenUtil.generateToken(user.getEmail(),Arrays.asList(user.getRoles()));
        JwtResponse tokenDto = new JwtResponse(jwt);
        return tokenDto;
    }
}
