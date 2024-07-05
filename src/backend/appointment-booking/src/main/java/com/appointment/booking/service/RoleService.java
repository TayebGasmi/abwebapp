package com.appointment.booking.service;

import com.appointment.booking.enums.Rolename;
import com.appointment.booking.model.Role;
import com.appointment.booking.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RoleService {
    @Autowired
    RoleRepository rolRepository;

    public Optional<Role> getByRolName(Rolename roleName){
        return rolRepository.findByroleName(roleName);
    }

    public boolean existsRolName(Rolename roleName){
        return rolRepository.existsByroleName(roleName);
    }

    public void save(Role role){
        rolRepository.save(role);
    }
}
