package com.appointment.booking.service;

import com.appointment.booking.dto.EmailDto;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.Map;

public interface EmailService {

    void sendEmail(@Valid @NotEmpty EmailDto emailDto, Map<String, Object> variables, String template) throws MessagingException;
}
