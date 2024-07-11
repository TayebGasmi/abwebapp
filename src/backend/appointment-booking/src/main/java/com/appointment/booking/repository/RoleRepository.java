package com.appointment.booking.repository;

import com.appointment.booking.enums.Rolename;
import com.appointment.booking.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByroleName(Rolename roleName);
    boolean existsByroleName(Rolename roleName);
}