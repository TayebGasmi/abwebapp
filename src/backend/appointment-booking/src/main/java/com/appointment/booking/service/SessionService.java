package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import com.appointment.booking.entity.Student;
import com.appointment.booking.mapper.SessionMapper;
import com.appointment.booking.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionService extends BaseServiceImpl<Session,Long, SessionDto> {
    private final SessionRepository sessionRepository;
    private final SessionMapper sessionMapper;

    public SessionDto bookSession(Long studentId, SessionDto sessionDTO) throws Exception{
        if (isDoubleBooked(sessionDTO, studentId)) {
            throw new IllegalStateException("You are already booked for this session.");
        }
        if (!isCapacityAvailable(sessionDTO)) {
            throw new IllegalStateException("The session is already at full capacity.");
        }
        Session session = sessionMapper.convertDtoToEntity(sessionDTO);
        Student student = new Student();
        student.setId(studentId);
        session.getStudents().add(student);
        Session savedSession = sessionRepository.save(session);
        return sessionMapper.convertEntityToDto(savedSession);
    }

    private boolean isDoubleBooked(SessionDto sessionDTO, Long studentId) {
        return sessionRepository.isStudentBooked(sessionDTO.getId(), studentId);
    }

    private boolean isCapacityAvailable(SessionDto sessionDTO) {
        int currentParticipants = sessionRepository.countParticipants(sessionDTO.getId());
        return currentParticipants < sessionDTO.getCapacity();
    }

    public Optional<SessionDto> getSession(Long sessionId) {
        return sessionRepository.findById(sessionId).map(sessionMapper::convertEntityToDto);
    }
}
