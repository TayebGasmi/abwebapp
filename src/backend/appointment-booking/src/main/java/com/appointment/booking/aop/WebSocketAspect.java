package com.appointment.booking.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class WebSocketAspect {


    @Pointcut("within(@org.springframework.stereotype.Service com.appointment.booking.ws..*)")
    public void websocketServiceMethods() {
    }


    @AfterThrowing(pointcut = "websocketServiceMethods()", throwing = "ex")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable ex) {
        log.error("Method {} threw an exception: {}", joinPoint.getSignature(), ex.getMessage(), ex);
    }
}
