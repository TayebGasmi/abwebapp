package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.SchoolTypeDto;
import com.appointment.booking.entity.SchoolYear;
import org.springframework.stereotype.Service;

@Service
public class SchoolYearService extends BaseServiceImpl<SchoolYear,Long, SchoolTypeDto> {
}
