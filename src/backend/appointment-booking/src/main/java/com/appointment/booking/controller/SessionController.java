package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/session")
@RequiredArgsConstructor
@Tag(name = "Session")
@CrossOrigin
public class SessionController extends BaseController<Session, Long, SessionDto> {

}
