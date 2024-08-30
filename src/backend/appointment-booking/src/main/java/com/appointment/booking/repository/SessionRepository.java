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


    @Query("SELECT s FROM Session s WHERE s.student.id = :studentId AND " +
           "(s.startDateTime BETWEEN :startDate AND :endDate OR s.endDateTime BETWEEN :startDate AND :endDate)")
    List<Session> findByStudentIdAndDateRange(@Param("studentId") Long studentId,
        @Param("startDate") ZonedDateTime startDate,
        @Param("endDate") ZonedDateTime endDate);

    @Query("SELECT s FROM Session s WHERE s.teacher.id = :teacherId AND " +
           "(s.startDateTime BETWEEN :startDate AND :endDate OR s.endDateTime BETWEEN :startDate AND :endDate)")
    List<Session> findByTeacherIdAndDateRange(@Param("teacherId") Long teacherId,
        @Param("startDate") ZonedDateTime startDate,
        @Param("endDate") ZonedDateTime endDate);
}