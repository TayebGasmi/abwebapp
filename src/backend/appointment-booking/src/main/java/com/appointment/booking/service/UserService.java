package com.appointment.booking.service;


import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.base.BaseService;
import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.RoleDTO;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.User;
import com.appointment.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService extends BaseServiceImpl<User,Long, UserDto> {

    @Autowired
    private UserRepository baseRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto add(UserDto userDto) throws Exception {
        if(!getByEmail(userDto.getEmail().toLowerCase()).isPresent()) {
            userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
            return super.add(userDto);
        }else{
            throw new Exception("user already exists");
        }
    }


    public Optional<User> getByEmail(String email){
        return baseRepository.findByEmail(email.toLowerCase());
    }

    public boolean existsEmail(String email){
        return baseRepository.existsByEmail(email);
    }

}
