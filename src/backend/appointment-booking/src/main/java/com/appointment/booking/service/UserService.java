package com.appointment.booking.service;


import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.Student;
import com.appointment.booking.entity.Teacher;
import com.appointment.booking.entity.User;
import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.exceptions.UserAlreadyVerifiedException;
import com.appointment.booking.mapper.UserMapper;
import com.appointment.booking.repository.StudentRepository;
import com.appointment.booking.repository.TeacherRepository;
import com.appointment.booking.repository.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService extends BaseServiceImpl<User, Long, UserDto> implements UserDetailsService {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    private final CodeVerificationService codeVerificationService;
    private final UserMapper userMapper;

    public void verifyEmail(String email, String code) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
        if (Boolean.TRUE.equals(user.getIsVerified())) {
            throw new UserAlreadyVerifiedException("User already verified");
        }
        codeVerificationService.verifyCode(user, code);
        user.setIsVerified(true);
        userRepository.save(user);

    }


    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByEmail(username)
            .orElseThrow(() -> new NotFoundException("User not found"));
    }

    @Override
    public UserDto update(UserDto dto) {
        Optional<Student> student = studentRepository.findById(dto.getId());
        Optional<Teacher> teacher = teacherRepository.findById(dto.getId());
        if (student.isPresent()) {
            Student stud = student.get();
            User user = userMapper.convertDtoToEntity(dto);
            stud.setParentProperties(user);
            return userMapper.convertEntityToDto(userRepository.save(stud));
        }
        if (teacher.isPresent()) {
            Teacher teacher1 = (Teacher) userMapper.convertDtoToEntity(dto);
            User user = userMapper.convertDtoToEntity(dto);
            teacher1.setParentProperties(user);
            return userMapper.convertEntityToDto(userRepository.save(teacher1));
        }
        return super.update(dto);
    }

    public UserDto getUserDetails(User user) {
        return userMapper.convertEntityToDto(user);
    }
}
