package com.appointment.booking.service;

import com.appointment.booking.model.User;
import com.appointment.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository UserRepository;

    public Optional<User> getByEmail(String email){
        return UserRepository.findByEmail(email);
    }

    public boolean existsEmail(String email){
        return UserRepository.existsByEmail(email);
    }

    public User save(User User){
        return UserRepository.save(User);
    }
}
