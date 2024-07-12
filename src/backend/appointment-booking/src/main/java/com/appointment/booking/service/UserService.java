package com.appointment.booking.service;


import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.RoleDTO;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.Role;
import com.appointment.booking.entity.User;
import com.appointment.booking.exceptions.ExistException;
import com.appointment.booking.mapper.RoleMapper;
import com.appointment.booking.mapper.UserMapper;
import com.appointment.booking.repository.RoleRepository;
import com.appointment.booking.repository.UserRepository;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService extends BaseServiceImpl<User, Long, UserDto> {

    private final UserRepository baseRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final RoleMapper roleMapper;
    private final RoleRepository roleRepository;
    @Override
    public UserDto add(UserDto userDto) throws Exception {
        if (getByEmail(userDto.getEmail().toLowerCase()).isEmpty()) {
            userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
            Set<RoleDTO> dtoRole=userDto.getRoles();
            Set<Role> roles= dtoRole.stream().map(roleDTO -> roleMapper.convertDtoToEntity(roleDTO)).collect(Collectors.toSet());
            Set<Role> rolesBase = roles.stream().map(role->roleRepository.findByRoleName(role.getRoleName()).get()).collect(Collectors.toSet());
            User user=userMapper.convertDtoToEntity(userDto);
            user.setRoles(rolesBase);
            UserDto savedUser=userMapper.convertEntityToDto(user);
            return super.add(savedUser);
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
