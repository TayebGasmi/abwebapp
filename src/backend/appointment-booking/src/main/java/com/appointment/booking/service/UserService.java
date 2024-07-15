package com.appointment.booking.service;


import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.User;
import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.exceptions.UserAlreadyVerifiedException;
import com.appointment.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService extends BaseServiceImpl<User, Long, UserDto> implements UserDetailsService {

    private final UserRepository userRepository;
    private final CodeVerificationService codeVerificationService;

    public void verifyEmail(String email, String code) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
        if (Boolean.TRUE.equals(user.getIsVerified())) {
            throw new UserAlreadyVerifiedException("User already verified");
        }
        codeVerificationService.verifyCode(user, code);
        user.setIsVerified(true);
        userRepository.save(user);

    }


    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByEmail(username)
            .orElseThrow(() -> new NotFoundException("User not found"));
    }
}
