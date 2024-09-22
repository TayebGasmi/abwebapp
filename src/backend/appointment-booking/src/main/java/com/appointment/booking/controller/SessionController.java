package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import com.appointment.booking.exceptions.SessionCancelException;
import com.appointment.booking.exceptions.SessionEditExpiredException;
import com.appointment.booking.service.SessionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.ZonedDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @PatchMapping("")
    @Override
    public ResponseEntity<SessionDto> update(SessionDto dto) throws SessionEditExpiredException {
        return new ResponseEntity<>(sessionService.updateSessionStartTime(dto), HttpStatus.OK);
    }

    @PatchMapping("/cancel/{id}")
    public ResponseEntity<SessionDto> cancel(@PathVariable Long id) throws SessionCancelException {
        return ResponseEntity.ok(sessionService.cancelSession(id));
    }
}
