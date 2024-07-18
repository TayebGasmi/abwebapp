package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Session;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SessionRepository extends BaseRepository<Session, Long> {
    @Query("SELECT COUNT(s) > 0 FROM Session s JOIN s.students sp " +
            "WHERE s.id = :sessionId AND sp.id = :studentId")
    boolean isStudentBooked(@Param("sessionId") Long sessionId, @Param("studentId") Long studentId);

    @Query("SELECT s FROM Session s WHERE s.teacher.id = :teacherId " +
            "AND ((s.startTime BETWEEN :startTime AND :endTime) " +
            "OR (s.endTime BETWEEN :startTime AND :endTime))")
    List<Session> findConflictingSessions(@Param("teacherId") Long teacherId,
                                          @Param("startTime") LocalDateTime startTime,
                                          @Param("endTime") LocalDateTime endTime);

    @Query("SELECT COUNT(sp) FROM Session s JOIN s.students sp " +
            "WHERE s.id = :sessionId")
    int countParticipants(@Param("sessionId") Long sessionId);
}