package com.appointment.booking.service;

import com.appointment.booking.crud.CrudService;
import com.appointment.booking.crud.CrudServiceImpl;
import com.appointment.booking.model.User;
import com.appointment.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService extends CrudServiceImpl<User, Long> {
    @Autowired
    UserRepository UserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public User create(User entity) throws Exception {
        if(!getByEmail(entity.getEmail().toLowerCase()).isPresent()) {
            entity.setPassword(passwordEncoder.encode(entity.getPassword()));
            return super.create(entity);
        }else{
            throw new Exception("user already exists");
        }
    }

    public UserService(CrudRepository<User, Long> repository) {
        super(repository);
    }

    public Optional<User> getByEmail(String email){
        return UserRepository.findByEmail(email.toLowerCase());
    }

    public boolean existsEmail(String email){
        return UserRepository.existsByEmail(email);
    }

    public User save(User User){
        return UserRepository.save(User);
    }
}
