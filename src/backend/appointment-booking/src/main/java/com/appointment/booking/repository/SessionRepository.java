package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Session;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends BaseRepository<Session, Long> {

}