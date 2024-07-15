package com.appointment.booking.service;

import com.appointment.booking.dto.LoginDTO;
import com.appointment.booking.dto.RegisterDTO;
import com.appointment.booking.dto.TokenDtoResponse;
import com.appointment.booking.entity.Role;
import com.appointment.booking.entity.User;
import com.appointment.booking.exceptions.ExistException;
import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.repository.UserRepository;
import com.appointment.booking.utils.GoogleTokenVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.mail.MessagingException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService  {

    private static final String USER_NOT_FOUND = "User not found";
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final CodeVerificationService codeVerificationService;
    private final AuthenticationManager authenticationManager;
    private final GoogleTokenVerifier googleTokenVerifier;

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

        return TokenDtoResponse.builder()
            .accessToken("jwt")
            .build();

    }

    TokenDtoResponse google(String token) {
        try {
            JWTClaimsSet claims = googleTokenVerifier.verify(token);
            log.info("Google claims: {}", claims);
            String email = claims.getSubject();
            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                User user = User.builder()
                    .email(email)
                    .build();
                userRepository.save(user);
            }
            return TokenDtoResponse.builder()
                .accessToken("jwt")
                .build();
        } catch (Exception e) {
            throw new UsernameNotFoundException("Invalid Google token");
        }
    }

}
