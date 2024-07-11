package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Student;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends BaseRepository<Student, Long> {

}