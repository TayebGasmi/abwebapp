package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import com.appointment.booking.service.SessionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.ZonedDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/session")
@RequiredArgsConstructor
@Tag(name = "Session")
public class SessionController extends BaseController<Session, Long, SessionDto> {

    private final SessionService sessionService;

    @GetMapping("/current")
    public List<SessionDto> getCurrentUserSessions(
        @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) ZonedDateTime startDate,
        @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) ZonedDateTime endDate
    ) {
        return sessionService.getCurrentUserSessionsWithinDateRange(startDate, endDate);
    }
}
