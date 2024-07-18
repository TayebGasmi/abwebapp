package com.appointment.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class AppointmentBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppointmentBookingApplication.class, args);
    }

}
