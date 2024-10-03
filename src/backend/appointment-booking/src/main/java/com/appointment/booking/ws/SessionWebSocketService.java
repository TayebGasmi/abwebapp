package com.appointment.booking.ws;

import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.exceptions.SessionConflictException;
import com.appointment.booking.service.SessionService;
import com.appointment.booking.utils.WsConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SessionWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;
    private final SessionService sessionService;


    public SessionDto addSessionAndNotify(SessionDto newSessionDto) throws SessionConflictException, NotFoundException {

        SessionDto addedSession = sessionService.add(newSessionDto);
        messagingTemplate.convertAndSend(WsConstants.SESSION_TOPIC, addedSession);
        log.info("Session added and notified via WebSocket: {}", addedSession);
        return addedSession;

    }

}
