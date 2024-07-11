package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.RoleDTO;
import com.appointment.booking.entity.Role;
import com.appointment.booking.enums.Rolename;
import com.appointment.booking.repository.RoleRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService extends BaseServiceImpl<Role, Long, RoleDTO> {

    private final RoleRepository roleRepository;

    public Optional<Role> findByName(Rolename name) {
        return roleRepository.findByroleName(name);
    }
}
