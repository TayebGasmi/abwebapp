package com.appointment.booking.service;

import static com.stripe.Stripe.apiKey;

import com.appointment.booking.dto.ConfigDto;
import com.appointment.booking.dto.PaymentDto;
import com.appointment.booking.dto.SessionDto;
import com.appointment.booking.dto.SessionMetadataDto;
import com.appointment.booking.entity.Payment;
import com.appointment.booking.entity.Student;
import com.appointment.booking.enums.PaymentStatus;
import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.mapper.SessionMapper;
import com.appointment.booking.mapper.StudentMapper;
import com.appointment.booking.repository.PaymentRepository;
import com.appointment.booking.utils.ConfigKeyConstants;
import com.appointment.booking.ws.SessionWebSocketService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PaymentService {

    private static final String SESSION_METADATA_KEY = "session_metadata";

    private final PaymentRepository paymentRepository;
    private final SessionWebSocketService sessionWebSocketService;
    private final String currency;
    private final String stripeWebhookSecret;
    private final ConfigService configService;
    private final ObjectMapper objectMapper;
    private final StudentMapper studentMapper;
    private final SessionMapper sessionMapper;

    public PaymentService(PaymentRepository paymentRepository, SessionWebSocketService sessionWebSocketService,
        @Value("${currency}") String currency,
        @Value("${stripe.secure.key}") String stripeSk,
        @Value("${stripe.webhook.secret}") String stripeWebhookSecret,
        ConfigService configService,
        ObjectMapper objectMapper,
        StudentMapper studentMapper,
        SessionMapper sessionMapper) {
        validateStripeKeys(stripeSk, stripeWebhookSecret);
        this.paymentRepository = paymentRepository;
        this.sessionWebSocketService = sessionWebSocketService;
        this.currency = currency;
        this.stripeWebhookSecret = stripeWebhookSecret;
        this.configService = configService;
        this.objectMapper = objectMapper;
        this.studentMapper = studentMapper;
        this.sessionMapper = sessionMapper;
        apiKey = stripeSk;
    }

    private void validateStripeKeys(String stripeSk, String stripeWebhookSecret) {
        if (stripeSk.isEmpty() || stripeWebhookSecret.isEmpty()) {
            throw new IllegalArgumentException("Stripe keys must not be empty");
        }
    }

    public Map<String, String> createPaymentIntent(PaymentDto paymentDto) throws StripeException, JsonProcessingException {
        Student student = getAuthenticatedStudent();
        paymentDto.getSession().setStudent(studentMapper.convertEntityToDto(student));
        setDefaultPaymentValues(paymentDto);

        PaymentIntent paymentIntent = createStripePaymentIntent(paymentDto);
        savePaymentToRepository(paymentDto, paymentIntent.getId());

        return Map.of("clientSecret", paymentIntent.getClientSecret());
    }

    private Student getAuthenticatedStudent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Student) authentication.getPrincipal();
    }

    private PaymentIntent createStripePaymentIntent(PaymentDto paymentDto) throws StripeException, JsonProcessingException {
        SessionMetadataDto sessionMetadataDto = sessionMapper.ConvertDtoToMetadataDto(paymentDto.getSession());
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
            .setAmount(paymentDto.getTotal().longValue() * 100)
            .setCurrency(currency)
            .putMetadata(SESSION_METADATA_KEY, objectMapper.writeValueAsString(sessionMetadataDto))
            .build();

        return PaymentIntent.create(params);
    }

    private void savePaymentToRepository(PaymentDto paymentDto, String paymentIntentId) {
        Payment payment = Payment.builder()
            .total(paymentDto.getTotal())
            .teacherShare(paymentDto.getTeacherShare())
            .adminShare(paymentDto.getAdminShare())
            .status(PaymentStatus.PENDING)
            .paymentIntentId(paymentIntentId)
            .isTeacherPaid(false)
            .build();

        paymentRepository.save(payment);
    }

    @Async
    public void handleStripeWebhook(String payload, String sigHeader) throws StripeException, JsonProcessingException {
        Event event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);
        log.info("Received event type: {}", event.getType());

        switch (event.getType()) {
            case "payment_intent.succeeded":
                handlePaymentIntentSucceeded(event);
                break;
            case "payment_intent.payment_failed":
                handlePaymentIntentFailed(event);
                break;
            default:
                log.info("Unhandled event type: {}", event.getType());
        }
    }

    private void handlePaymentIntentSucceeded(Event event) throws JsonProcessingException {
        PaymentIntent paymentIntent = getPaymentIntentFromEvent(event);
        SessionDto sessionDto = getSessionDtoFromPaymentIntent(paymentIntent);

        if (sessionDto != null) {
            sessionDto = sessionWebSocketService.addSessionAndNotify(sessionDto);
        }

        updatePaymentAndSessionStatus(paymentIntent.getId(), PaymentStatus.SUCCEEDED, Optional.ofNullable(sessionDto));
        log.info("PaymentIntent succeeded: {}", paymentIntent.getId());
    }

    private PaymentIntent getPaymentIntentFromEvent(Event event) {
        return (PaymentIntent) event.getDataObjectDeserializer().getObject()
            .orElseThrow(() -> new IllegalArgumentException("Failed to retrieve PaymentIntent from event"));
    }

    private SessionDto getSessionDtoFromPaymentIntent(PaymentIntent paymentIntent) throws JsonProcessingException {
        String sessionDtoJson = paymentIntent.getMetadata().get(SESSION_METADATA_KEY);
        SessionMetadataDto sessionMetadataDto = (sessionDtoJson != null) ? objectMapper.readValue(sessionDtoJson, SessionMetadataDto.class) : null;

        return sessionMetadataDto != null ? sessionMapper.ConvertMetaDataToDto(sessionMetadataDto) : null;
    }

    private void handlePaymentIntentFailed(Event event) {
        PaymentIntent paymentIntent = getPaymentIntentFromEvent(event);
        updatePaymentAndSessionStatus(paymentIntent.getId(), PaymentStatus.FAILED, Optional.empty());
        log.warn("PaymentIntent failed: {}", paymentIntent.getId());
    }

    private void updatePaymentAndSessionStatus(String paymentIntentId, PaymentStatus status, Optional<SessionDto> sessionDto) {
        Payment payment = paymentRepository.findByPaymentIntentId(paymentIntentId)
            .orElseThrow(() -> new NotFoundException("Payment not found for PaymentIntent ID: " + paymentIntentId));

        payment.setStatus(status);
        sessionDto.ifPresent(dto -> {
            payment.setSession(sessionMapper.convertDtoToEntity(dto));
            log.info("Updated session status for PaymentIntent ID: {}", paymentIntentId);
        });

        paymentRepository.save(payment);
        log.info("Updated payment status to {} for PaymentIntent ID: {}", status, paymentIntentId);
    }

    private void setDefaultPaymentValues(PaymentDto paymentDto) {
        Long adminShare = getLongConfigValue(ConfigKeyConstants.ADMIN_SHARE, 5L);
        Long teacherShare = getLongConfigValue(ConfigKeyConstants.TEACHER_SHARE, 25L);

        paymentDto.setAdminShare(BigDecimal.valueOf(adminShare));
        paymentDto.setTeacherShare(BigDecimal.valueOf(teacherShare));
    }

    private Long getLongConfigValue(String key, Long defaultValue) {
        return configService.getConfigDtoByKey(key)
            .map(ConfigDto::getValue)
            .map(Long::parseLong)
            .orElse(defaultValue);
    }
}
