package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.RoleDTO;
import com.appointment.booking.enums.Rolename;
import com.appointment.booking.entity.Role;
import com.appointment.booking.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RoleService extends BaseServiceImpl<Role, Long, RoleDTO> {

        @Autowired
        private RoleRepository roleRepository;

        public Optional<Role> findByName(Rolename name) {
            return roleRepository.findByroleName(name);
        }
}
