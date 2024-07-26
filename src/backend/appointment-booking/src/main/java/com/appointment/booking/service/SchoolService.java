package com.appointment.booking.service;

import com.appointment.booking.base.BaseService;
import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.SchoolDto;
import com.appointment.booking.entity.School;
import org.springframework.stereotype.Service;

@Service
public class SchoolService extends BaseServiceImpl<School,Long, SchoolDto> {
}
