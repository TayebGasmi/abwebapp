package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.SchoolYear;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolYearRepository extends BaseRepository<SchoolYear, Long> {

}