package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.PaymentDto;
import com.appointment.booking.entity.Payment;
import com.appointment.booking.service.PaymentService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@Tag(name = "Payment", description = "API for handling payments")
public class PaymentController extends BaseController<Payment, Long, PaymentDto> {

    private final PaymentService paymentService;

    private static final String STRIPE_WEBHOOK_SECRET = "your_webhook_secret_here"; // set your Stripe webhook secret

    @PostMapping("/create-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody PaymentDto paymentDto) throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentDto);
        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", paymentIntent.getClientSecret());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/stripe-webhook")
    public ResponseEntity<String> handleWebhook(
        @RequestBody String payload,
        @RequestHeader("Stripe-Signature") String sigHeader) {
        String endpointSecret = STRIPE_WEBHOOK_SECRET;
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            // Invalid signature
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Webhook signature verification failed");
        }

        // Handle the event
        switch (event.getType()) {
            case "payment_intent.succeeded":
                PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);
                System.out.println("PaymentIntent was successful!");
                // You can add logic to handle successful payments here
                break;
            case "payment_intent.payment_failed":
                paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);
                System.out.println("PaymentIntent failed.");
                // Handle failed payment here
                break;
            // ... handle other event types
            default:
                System.out.println("Unhandled event type: " + event.getType());
        }

        return ResponseEntity.ok("Received Stripe webhook");
    }
}
