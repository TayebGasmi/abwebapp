package com.appointment.booking.service;


import com.appointment.booking.dto.EmailDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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


    private String generateEmailContent() {
        var context = new Context();
        return templateEngine.process("email", context);
    }


    @Override
    public void sendEmail(@Valid @NotNull EmailDto emailDto) throws MessagingException {
        try {
            MimeMessage mimeMessage = createMimeMessage(emailDto);
            mailSender.send(mimeMessage);
            log.info("Email sent successfully");
        } catch (Exception e) {
            log.error("Error in send mail ", e);
            throw e;
        }


    }

    private MimeMessage createMimeMessage(EmailDto emailDto) throws MessagingException {
        var message = mailSender.createMimeMessage();

        var helper = new MimeMessageHelper(message, true);
        String emailContent = generateEmailContent();
        helper.setTo(emailDto.getTo().toArray(new String[0]));
        helper.setFrom(emailDto.getFrom());
        helper.setSubject(emailDto.getSubject());
        helper.setText(emailContent, true);
        mailSender.send(message);
        return message;
    }
}
