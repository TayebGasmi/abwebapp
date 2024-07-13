package com.appointment.booking.service;


import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.EmailDto;
import com.appointment.booking.dto.RoleDTO;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.CodeGenerator;
import com.appointment.booking.entity.Role;
import com.appointment.booking.entity.User;
import com.appointment.booking.exceptions.ExistException;
import com.appointment.booking.mapper.RoleMapper;
import com.appointment.booking.mapper.UserMapper;
import com.appointment.booking.repository.CodeGeneratorRepository;
import com.appointment.booking.repository.RoleRepository;
import com.appointment.booking.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService extends BaseServiceImpl<User, Long, UserDto> {
    private final CodeGeneratorRepository codeGeneratorRepository;
    private final UserRepository baseRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final RoleMapper roleMapper;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
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
            EmailDto email= new EmailDto();
            User userDb=userMapper.convertDtoToEntity(super.add(savedUser));
            String generatedCode = generate4DigitCode();
            email.setTo(new HashSet<>(List.of(userDto.getEmail())));
            email.setBody("Hello this is your code"+generatedCode);
            email.setSubject("confirmation code");
            CodeGenerator userCode = new CodeGenerator();
            userCode.setCode(generatedCode);
            userCode.setExpirationDate(LocalDateTime.now().plusMinutes(10));//10minutes expiration
            userCode.setUser(userDb);
            codeGeneratorRepository.save(userCode);
            email.setFrom("finder116@gmail.com");
            emailService.sendEmail(email,userDb.getFirstName()+" "+userDb.getLastName(),generatedCode);
            return userMapper.convertEntityToDto(userDb);
        } else {
            throw new ExistException("user already exists");
        }
    }
    private boolean verifyCodeUser(User user,String code) throws Exception {
        Optional<CodeGenerator> codeGenerator = codeGeneratorRepository.findCodeGeneratorByUserAndCode(user,code);
        return codeGenerator.isPresent() && codeGenerator.get().getExpirationDate().isBefore(LocalDateTime.now());
    }
    private String generate4DigitCode() {
        Random random = new Random();
        int code = 1000 + random.nextInt(9000); // Generates a random number between 1000 and 9999
        return String.valueOf(code);
    }

    private UserDto enableUser(UserDto userDto) throws Exception {
        User user=userMapper.convertDtoToEntity(userDto);
        user.setIsEnabled(true);
        userRepository.save(user);
        return userMapper.convertEntityToDto(user);
    }


    public Optional<User> getByEmail(String email) {
        return baseRepository.findByEmail(email.toLowerCase());
    }

    public boolean existsEmail(String email) {
        return baseRepository.existsByEmail(email);
    }

}
