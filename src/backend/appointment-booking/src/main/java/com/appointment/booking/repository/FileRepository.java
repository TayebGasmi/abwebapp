package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.File;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends BaseRepository<File, Long> {

}
