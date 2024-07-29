package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Config;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigRepository extends BaseRepository<Config, Long> {

}