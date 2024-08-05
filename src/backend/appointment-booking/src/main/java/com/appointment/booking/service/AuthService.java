package com.appointment.booking.service;

import com.appointment.booking.dto.LoginDTO;
import com.appointment.booking.dto.LoginDtoResponse;
import com.appointment.booking.dto.Oauth2Dto;
import com.appointment.booking.dto.RegisterDTO;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.Role;
import com.appointment.booking.entity.User;
import com.appointment.booking.enums.RoleType;
import com.appointment.booking.exceptions.ExistException;
import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.mapper.UserMapper;
import com.appointment.booking.repository.UserRepository;
import com.appointment.booking.utils.GoogleTokenVerifier;
import com.appointment.booking.utils.JwtUTil;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.mail.MessagingException;
import java.text.ParseException;
import java.util.Set;
import java.util.stream.Collectors;
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
    private final JwtUTil jwtUtil;
    private final UserMapper userMapper;

    public void register(RegisterDTO registerDTO) throws ExistException, MessagingException {
        checkIfEmailExists(registerDTO.getEmail());
        Role role = roleService.findByName(RoleType.STUDENT)
            .orElseThrow(() -> new NotFoundException("Role not found"));
        User user = buildNewUser(registerDTO, Set.of(role));
        userRepository.save(user);

        codeVerificationService.sendVerificationCode(user);
    }

    public LoginDtoResponse login(LoginDTO loginDTO) {
        authenticateUser(loginDTO.getEmail(), loginDTO.getPassword());

        User user = userRepository.findByEmail(loginDTO.getEmail())
            .orElseThrow(() -> new NotFoundException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(),
            user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet()));

        return buildTokenResponse(token, "", userMapper.convertEntityToDto(user));
    }

    public LoginDtoResponse socialLogin(Oauth2Dto oauth2Dto) throws ParseException, JOSEException {
        JWTClaimsSet claims = googleTokenVerifier.verify(oauth2Dto.getIdToken());
        log.info("Google claims: {}", claims);

        String email = claims.getStringClaim("email");
        String firstName = claims.getStringClaim("given_name");
        String lastName = claims.getStringClaim("family_name");
        String profilePicture = claims.getStringClaim("picture");
        User user = userRepository.findByEmail(email)
            .orElseGet(() -> {
                User newUser = buildNewSocialUser(email, firstName, lastName, profilePicture);
                userRepository.save(newUser);
                return newUser;
            });

        String token = jwtUtil.generateToken(user.getEmail(),
            user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet()));
        UserDto userDto = userMapper.convertEntityToDto(user);
        return buildTokenResponse(token, "", userDto);
    }

    private void checkIfEmailExists(String email) throws ExistException {
        if (userRepository.existsByEmail(email)) {
            throw new ExistException("Email already exists");
        }
    }

    private User buildNewUser(RegisterDTO registerDTO, Set<Role> roles) {
        return User.builder()
            .email(registerDTO.getEmail())
            .password(passwordEncoder.encode(registerDTO.getPassword()))
            .firstName(registerDTO.getFirstName())
            .lastName(registerDTO.getLastName())
            .roles(roles)
            .build();
    }

    private void authenticateUser(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private User buildNewSocialUser(String email, String firstName, String lastName, String profilePicture) {
        Role studentRole = roleService.findByName(RoleType.STUDENT)
            .orElseThrow(() -> new NotFoundException("Role not found"));

        return User.builder()
            .email(email)
            .firstName(firstName)
            .lastName(lastName)
            .isVerified(true)
            .profilePicture(profilePicture)
            .roles(Set.of(studentRole))
            .build();
    }

    private LoginDtoResponse buildTokenResponse(String token, String refreshToken, UserDto user) {
        return LoginDtoResponse.builder()
            .accessToken(token)
            .refreshToken(refreshToken)
            .user(user)
            .build();
    }
}
