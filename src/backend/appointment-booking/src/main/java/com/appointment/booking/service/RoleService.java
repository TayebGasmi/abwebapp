package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.RoleDTO;
import com.appointment.booking.entity.Role;
import com.appointment.booking.enums.RoleName;
import com.appointment.booking.mapper.RoleMapper;
import com.appointment.booking.repository.RoleRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService extends BaseServiceImpl<Role, Long, RoleDTO> {

    private final RoleMapper roleMapper;
    private final RoleRepository roleRepository;
    @Override
    public RoleDTO add(RoleDTO dto) throws Exception {
        RoleName roleName = RoleName.valueOf(dto.getRoleName());
        Role role =roleMapper.convertDtoToEntity(dto);
        role.setRoleName(roleName);
        RoleDTO roleDTO = roleMapper.convertEntityToDto(role);
        return super.add(roleDTO);
    }


    public Optional<Role> findByName(RoleName name) {
        return roleRepository.findByRoleName(name);
    }
}
