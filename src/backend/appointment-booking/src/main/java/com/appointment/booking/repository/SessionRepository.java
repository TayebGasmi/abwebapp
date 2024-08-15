package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Session;
import java.time.ZonedDateTime;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends BaseRepository<Session, Long> {

    @Query("SELECT COUNT(s) > 0 FROM Session s WHERE " +
           "(s.teacher.id = :teacherId OR s.student.id = :studentId) AND " +
           "((s.startTime < :endTime AND s.endTime > :startTime))")
    boolean existsConflictingSession(
        @Param("teacherId") Long teacherId,
        @Param("studentId") Long studentId,
        @Param("startTime") ZonedDateTime startTime,
        @Param("endTime") ZonedDateTime endTime
    );


}