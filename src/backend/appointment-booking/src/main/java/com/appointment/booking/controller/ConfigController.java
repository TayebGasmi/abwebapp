package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.ConfigDto;
import com.appointment.booking.entity.Config;
import com.appointment.booking.service.ConfigService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/config")
@RequiredArgsConstructor
@Tag(name = "Config")
@CrossOrigin
public class ConfigController extends BaseController<Config, Long, ConfigDto> {

    private final ConfigService configService;

    @GetMapping("session-price")
    ResponseEntity<BigDecimal> getSessionPrice() {
        return ResponseEntity.ok().body(configService.getSessionPrice());
    }
}
