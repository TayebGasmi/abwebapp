package com.appointment.booking.service;

import static com.appointment.booking.utils.ConfigKeyConstants.SESSION_PRICE;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.ConfigDto;
import com.appointment.booking.entity.Config;
import com.appointment.booking.mapper.ConfigMapper;
import com.appointment.booking.repository.ConfigRepository;
import java.math.BigDecimal;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConfigService extends BaseServiceImpl<Config, Long, ConfigDto> {

    private final ConfigRepository configRepository;
    private final ConfigMapper configMapper;

    public Optional<ConfigDto> getConfigDtoByKey(String key) {

        return configRepository.findByKeyEquals(key).map(configMapper::convertEntityToDto);
    }

    public BigDecimal getSessionPrice() {
        return configRepository.findByKeyEquals(SESSION_PRICE)
            .map(Config::getValue)
            .map(Long::parseLong)
            .map(BigDecimal::valueOf)
            .orElse(BigDecimal.valueOf(30));
    }
}
