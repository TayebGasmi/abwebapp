package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.SchoolDto;
import com.appointment.booking.entity.SchoolType;
import org.springframework.stereotype.Service;

@Service
public class SchoolService extends BaseServiceImpl<SchoolType,Long, SchoolDto> {
}
