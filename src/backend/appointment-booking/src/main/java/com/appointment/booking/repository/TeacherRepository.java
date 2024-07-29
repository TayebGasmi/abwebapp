package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Teacher;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends BaseRepository<Teacher, Long> {

}