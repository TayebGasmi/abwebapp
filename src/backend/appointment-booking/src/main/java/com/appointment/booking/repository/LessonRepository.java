package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Lesson;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends BaseRepository<Lesson, Long> {

}