package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Teacher;
import java.time.ZonedDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

    @Repository
    public interface TeacherRepository extends BaseRepository<Teacher, Long> {

        @Query("""
           SELECT t FROM Teacher t 
           JOIN t.subjects s
           WHERE s.name = :subjectName
           AND NOT EXISTS (
               SELECT 1 FROM Session session 
               WHERE session.teacher = t
               AND session.startDateTime < :endTime 
               AND session.endDateTime > :startTime
           )
           """)
        List<Teacher> findAvailableTeachersBySubjectAndTime(String subjectName, ZonedDateTime startTime, ZonedDateTime endTime);
    }