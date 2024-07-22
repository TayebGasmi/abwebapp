package com.appointment.booking.aop;

import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.entity.Session;
import com.appointment.booking.entity.User;
import com.appointment.booking.repository.SessionRepository;
import com.appointment.booking.repository.UserRepository;
import com.appointment.booking.service.CodeVerificationService;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.Optional;

@AllArgsConstructor
@Aspect
@Component
public class SessionAop {
    private final CodeVerificationService codeVerificationService;
    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;

    @Pointcut("execution(* com.appointment.booking.service.SessionService.add(..))")
    public void afterSavingSession() {
    }

    @AfterReturning(value = "afterSavingSession()",returning = "result")
    public void afterAdvice(JoinPoint jp,SessionDto result) {
        System.out.println("Method Signature: "  + jp.getSignature());
        Optional<Session> sessionentity= sessionRepository.findById(result.getId());
        Optional<User> teacher = userRepository.findById(sessionentity.get().getTeacher().getId());
        String email = teacher.get().getEmail();
        String name = teacher.get().getFirstName();
        try {
            codeVerificationService.sendSessionCreationConfirmation(result,email,name);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

}
