package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.TeacherDto;
import com.appointment.booking.dto.UserDto;
import com.appointment.booking.entity.Teacher;
import com.appointment.booking.mapper.TeacherMapper;
import com.appointment.booking.mapper.UserMapper;
import com.appointment.booking.repository.TeacherRepository;
import com.appointment.booking.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TeacherService extends BaseServiceImpl<Teacher,Long, TeacherDto> {
   private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;
    @Override
    public TeacherDto findById(Long id) {
        UserDto userDto = userMapper.convertEntityToDto(userRepository.findById(id).orElseThrow(()->new EntityNotFoundException("User not found")));
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setId(userDto.getId());
        teacherDto.setUserDto(userDto);
        return teacherDto;
    }
}
