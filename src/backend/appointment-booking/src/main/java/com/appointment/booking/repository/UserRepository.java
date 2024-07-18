package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Role;
import com.appointment.booking.entity.User;
import java.util.Optional;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    Role findRoleByEmail(String email);

}