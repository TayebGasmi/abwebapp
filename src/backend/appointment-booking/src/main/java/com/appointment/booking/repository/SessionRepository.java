package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Session;
import java.time.ZonedDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends BaseRepository<Session, Long> {

    @Query("SELECT COUNT(s) > 0 FROM Session s WHERE " +
           "(s.teacher.id = :teacherId OR s.student.id = :studentId) AND " +
           "((s.startDateTime < :endDateTime AND s.endDateTime > :startDateTime))")
    boolean existsConflictingSession(
        @Param("teacherId") Long teacherId,
        @Param("studentId") Long studentId,
        @Param("startDateTime") ZonedDateTime startDateTime,
        @Param("endDateTime") ZonedDateTime endDateTime
    );


    List<Session> findByStudentId(Long id);

    List<Session> findByTeacherId(Long id);
}