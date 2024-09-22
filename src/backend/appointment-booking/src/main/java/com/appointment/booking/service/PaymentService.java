package com.appointment.booking.service;

import static com.stripe.Stripe.apiKey;

import com.appointment.booking.base.BaseServiceImpl;
import com.appointment.booking.dto.PaymentDto;
import com.appointment.booking.entity.Payment;
import com.appointment.booking.repository.PaymentRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService extends BaseServiceImpl<Payment, Long, PaymentDto> {

    private final PaymentRepository paymentRepository;
    private final String currency;
    private final String stripeSk;

    public PaymentService(
        PaymentRepository paymentRepository,
        @Value("${currency}") String currency,
        @Value("${stripe.secure.key}") String stripeSk) {
        this.paymentRepository = paymentRepository;
        this.currency = currency;
        this.stripeSk = stripeSk;
        apiKey = stripeSk;
    }

    public PaymentIntent createPaymentIntent(PaymentDto paymentDto) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
            .setAmount(paymentDto.getTotal().longValue())
            .setCurrency(currency)
            .build();
        return PaymentIntent.create(params);
    }
}

