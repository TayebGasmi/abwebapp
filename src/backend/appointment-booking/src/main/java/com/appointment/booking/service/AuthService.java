package com.appointment.booking.service;

import com.appointment.booking.dto.LoginDTO;
import com.appointment.booking.dto.Oauth2Dto;
import com.appointment.booking.dto.RegisterDTO;
import com.appointment.booking.dto.TokenDtoResponse;
import com.appointment.booking.entity.Role;
import com.appointment.booking.entity.User;
import com.appointment.booking.exceptions.ExistException;
import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.repository.RoleRepository;
import com.appointment.booking.repository.UserRepository;
import com.appointment.booking.utils.GoogleTokenVerifier;
import com.appointment.booking.utils.JwtUTil;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.mail.MessagingException;
import java.text.ParseException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final CodeVerificationService codeVerificationService;
    private final AuthenticationManager authenticationManager;
    private final GoogleTokenVerifier googleTokenVerifier;
    private final JwtUTil jwtUTil;
    private final RoleRepository roleRepository;
    public void register(RegisterDTO registerDTO) throws ExistException, MessagingException {
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new ExistException("Email already exists");
        }
        Role role = roleService.findByName(registerDTO.getRole()).orElseThrow(() -> new NotFoundException("Role not found"));
        User user = User.builder()
            .email(registerDTO.getEmail())
            .password(passwordEncoder.encode(registerDTO.getPassword()))
            .role(role)
            .build();
        user = userRepository.save(user);
        codeVerificationService.sendVerificationCode(user);

    }

    public TokenDtoResponse login(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(),
                loginDTO.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User userLogin = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(()->new NotFoundException("User not found"));
        return TokenDtoResponse.builder()
            .accessToken(jwtUTil.generateToken(loginDTO.getEmail(), userLogin.getRole().getName().toString()))
            .build();

    }

    public TokenDtoResponse sigInWithGoogle(Oauth2Dto oauth2Dto) throws ParseException, JOSEException {

        JWTClaimsSet claims = googleTokenVerifier.verify(oauth2Dto.getIdToken());
        log.info("Google claims: {}", claims);
        String email = claims.getStringClaim("email");
        String firstName = claims.getStringClaim("given_name");
        String lastName = claims.getStringClaim("family_name");
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            User user = User.builder()
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .isVerified(true)
                .build();
            userRepository.save(user);
            return TokenDtoResponse.builder()
                .accessToken(jwtUTil.generateToken(user.getEmail(), ""))
                .build();
        }
        return TokenDtoResponse.builder()
            .accessToken(jwtUTil.generateToken(userOptional.get().getEmail(), ""))
            .build();
    }


}
