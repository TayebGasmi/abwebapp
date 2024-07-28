package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.SchoolTypeDto;
import com.appointment.booking.entity.SchoolType;
import com.appointment.booking.repository.SchoolTypeRepository;
import org.springframework.stereotype.Service;

@Service
public class SchoolTypeService extends BaseServiceImpl<SchoolType,Long, SchoolTypeDto> {
}
