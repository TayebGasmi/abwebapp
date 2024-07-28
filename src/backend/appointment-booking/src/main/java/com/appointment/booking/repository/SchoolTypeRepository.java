package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.SchoolType;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolTypeRepository extends BaseRepository<SchoolType, Long> {
}