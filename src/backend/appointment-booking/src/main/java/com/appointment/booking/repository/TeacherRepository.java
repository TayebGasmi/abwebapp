package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Teacher;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends BaseRepository<Teacher, Long> {

    @Query("SELECT t FROM Teacher t " +
           "JOIN t.subjects s " +
           "WHERE s.name = :subjectName")
    List<Teacher> findTeachersBySubjectName(String subjectName);
}