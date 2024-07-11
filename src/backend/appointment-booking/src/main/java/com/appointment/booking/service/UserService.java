package com.appointment.booking.service;


import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.User;
import com.appointment.booking.exceptions.ExistException;
import com.appointment.booking.repository.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService extends BaseServiceImpl<User, Long, UserDto> {

    private final UserRepository baseRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto add(UserDto userDto) throws Exception {
        if (getByEmail(userDto.getEmail().toLowerCase()).isEmpty()) {
            userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
            return super.add(userDto);
        } else {
            throw new ExistException("user already exists");
        }
    }


    public Optional<User> getByEmail(String email) {
        return baseRepository.findByEmail(email.toLowerCase());
    }

    public boolean existsEmail(String email) {
        return baseRepository.existsByEmail(email);
    }

}
