package com.appointment.booking.service;

import com.appointment.booking.dto.EmailDto;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.User;
import com.appointment.booking.entity.VerificationCode;
import com.appointment.booking.repository.CodeVerificationRepository;
import com.appointment.booking.utils.CodeGenerationUtil;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CodeVerificationService {

    private final CodeVerificationRepository codeVerificationRepository;
    private final EmailService emailService;

    private void saveCode(User user, String code) {
        codeVerificationRepository.save(VerificationCode.builder()
            .user(user)
            .code(code)
            .build());
    }

    @Transactional
    public void sendVerificationCode(User user) throws MessagingException {
        String code = CodeGenerationUtil.generate4DigitCode();
        Map<String, Object> mailVariables = Map.of("confirmationCode", code, "email", user.getEmail());
        deletePreviousVerification(user);
        saveCode(user, code);
        emailService.sendEmail(
            EmailDto.builder()
                .to(Set.of(user.getEmail()))
                .from("doowi@gmail.com")
                .subject("confirmation code")
                .build(),
            mailVariables,
            "code-verification"
        );
    }
    @Transactional
    public void sendSessionCreationConfirmation(SessionDto sessionDto, String email, String teacherName) throws MessagingException {
        Map<String, Object> mailVariables = Map.of("teacherName",teacherName,"sessionTitle",sessionDto.getTitle(),"sessionDescription",sessionDto.getDescription(),"StartDate", sessionDto.getStartTime(), "email", email);
        emailService.sendEmail(
                EmailDto.builder()
                        .to(Set.of(email))
                        .from("doowi@gmail.com")
                        .subject("Session Creation")
                        .build(),
                mailVariables,
                "created-session"
        );
    }

    @Transactional
    @Async
    public void deletePreviousVerification(User user) {
        codeVerificationRepository.deleteByUserEmail(user.getEmail());
    }

    @Transactional
    public void verifyCode(User user, String code) {
        codeVerificationRepository.findByUserEmailAndCode(user.getEmail(), code)
            .orElseThrow(() -> new EntityNotFoundException("Invalid code"));
        deletePreviousVerification(user);
    }
}
