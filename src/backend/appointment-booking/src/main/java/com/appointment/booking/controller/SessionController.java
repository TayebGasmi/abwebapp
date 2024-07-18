package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/session")
public class SessionController extends BaseController<Session,Long, SessionDto> {
}
