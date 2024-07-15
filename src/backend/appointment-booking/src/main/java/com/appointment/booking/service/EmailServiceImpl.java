package com.appointment.booking.service;

import com.appointment.booking.dto.EmailDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    private String generateEmailContent(Map<String, Object> variables, String template) {
        var context = new Context();
        context.setVariables(variables);
        return templateEngine.process(template, context);
    }

    public void sendEmail(@Valid @NotNull EmailDto emailDto, Map<String, Object> variables, String template) throws MessagingException {

        MimeMessage mimeMessage = createMimeMessage(emailDto, variables, template);
        mailSender.send(mimeMessage);

    }

    private MimeMessage createMimeMessage(EmailDto emailDto, Map<String, Object> variables, String template) throws MessagingException {
        var message = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(message, true);
        String emailContent = generateEmailContent(variables, template);
        helper.setTo(emailDto.getTo().toArray(new String[0]));
        helper.setFrom(emailDto.getFrom());
        helper.setText(emailContent, true);
        return message;
    }
}
