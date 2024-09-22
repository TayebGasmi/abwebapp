package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.PaymentDto;
import com.appointment.booking.entity.Payment;
import com.appointment.booking.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@Tag(name = "Payment", description = "API for handling payments")
public class PaymentController extends BaseController<Payment, Long, PaymentDto> {

    private final PaymentService paymentService;

    @PostMapping("/create-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody PaymentDto paymentDto) throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentDto);
        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", paymentIntent.getClientSecret());
        return ResponseEntity.ok(response);
    }

}
