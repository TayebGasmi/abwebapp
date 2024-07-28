package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.SchoolTypeDto;
import com.appointment.booking.entity.SchoolType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SchoolTypeService extends BaseServiceImpl<SchoolType,Long, SchoolTypeDto> {
}
