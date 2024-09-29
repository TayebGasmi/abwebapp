package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Payment;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends BaseRepository<Payment, Long> {

    Optional<Payment> findByPaymentIntentId(String paymentIntentId);
}