package com.appointment.booking.service;

import com.appointment.booking.dto.RegisterDTO;
import com.appointment.booking.entity.Role;
import com.appointment.booking.entity.User;
import com.appointment.booking.exceptions.ExistException;
import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.repository.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final CodeVerificationService codeVerificationService;

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


    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByEmail(username)
            .orElseThrow(() -> new NotFoundException("User not found"));
    }
}
