package com.appointment.booking.service;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import org.springframework.stereotype.Service;

@Service
public class SessionService extends BaseServiceImpl<Session,Long, SessionDto> {
}
