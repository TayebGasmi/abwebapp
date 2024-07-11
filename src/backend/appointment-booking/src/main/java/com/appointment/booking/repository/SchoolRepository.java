package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.School;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepository extends BaseRepository<School, Long> {

}