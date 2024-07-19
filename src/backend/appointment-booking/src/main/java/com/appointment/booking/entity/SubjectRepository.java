package com.appointment.booking.entity;

import com.appointment.booking.base.BaseRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SubjectRepository extends BaseRepository<Subject, Long>, JpaSpecificationExecutor<Subject> {

}