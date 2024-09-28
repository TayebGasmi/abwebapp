package com.appointment.booking.exceptions;

import com.appointment.booking.model.ErrorResponse;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import jakarta.validation.ConstraintViolationException;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
@Slf4j
public class ControllerAdvice {

    private static final String ERROR_MESSAGE = "error {}";

    private ResponseEntity<ErrorResponse> createErrorResponse(HttpStatus status, Exception ex, String keyMessage) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .status(status)
            .debugMessage(ex.getMessage())
            .keyMessage(keyMessage)
            .build();
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    protected ResponseEntity<ErrorResponse> handleMissingServletRequestParameter(
        MissingServletRequestParameterException ex) {
        String error = ex.getParameterName() + " parameter is missing";
        return createErrorResponse(HttpStatus.BAD_REQUEST, ex, error);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    protected ResponseEntity<ErrorResponse> handleHttpMediaTypeNotSupported(
        HttpMediaTypeNotSupportedException ex) {
        String supportedMediaTypes = ex.getSupportedMediaTypes().stream()
            .map(Object::toString)
            .collect(Collectors.joining(", "));
        String error = String.format("%s media type is not supported. Supported media types are %s",
            ex.getContentType(), supportedMediaTypes);
        return createErrorResponse(HttpStatus.UNSUPPORTED_MEDIA_TYPE, ex, error);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected ResponseEntity<ErrorResponse> handleHttpMessageNotReadable(
        HttpMessageNotReadableException ex) {
        return createErrorResponse(HttpStatus.BAD_REQUEST, ex, "Malformed JSON request");
    }

    @ExceptionHandler(HttpMessageNotWritableException.class)
    protected ResponseEntity<ErrorResponse> handleHttpMessageNotWritable(
        HttpMessageNotWritableException ex) {
        return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex, "Error writing JSON output");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        return handleValidationErrors(ex);
    }

    private ResponseEntity<Object> handleValidationErrors(MethodArgumentNotValidException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .status(HttpStatus.BAD_REQUEST)
            .debugMessage("Validation Error")
            .keyMessage(KeyExceptionMessageConstants.VALIDATION_ERROR)
            .subErrors(new ValidationError().getSubErrors(ex))
            .build();
        log.error("Validation Error", ex);
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(NotFoundException ex) {
        return createErrorResponse(HttpStatus.NOT_FOUND, ex, KeyExceptionMessageConstants.ENTITY_NOT_FOUND);
    }

    @ExceptionHandler(ExistException.class)
    public ResponseEntity<ErrorResponse> handleModuleNotFoundException(ExistException ex) {
        return createErrorResponse(HttpStatus.CONFLICT, ex, KeyExceptionMessageConstants.ENTITY_EXIST);
    }

    @ExceptionHandler(UniquenessException.class)
    public ResponseEntity<ErrorResponse> handleUniqueException(UniquenessException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .status(HttpStatus.BAD_REQUEST)
            .debugMessage(KeyExceptionMessageConstants.UNIQUE_CONSTRAINT_VIOLATION)
            .keyMessage(KeyExceptionMessageConstants.UNIQUE_CONSTRAINT_VIOLATION)
            .subErrors(ex.getUniqueConstraintViolationExceptions())
            .build();
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }


    @ExceptionHandler(DataIntegrityViolationException.class)
    protected ResponseEntity<ErrorResponse> handleDataIntegrityViolation(
        DataIntegrityViolationException ex) {
        if (ex.getCause() instanceof ConstraintViolationException) {
            return createErrorResponse(HttpStatus.CONFLICT, ex, "Database error");
        }
        return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex, "Data integrity violation");
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatch(
        MethodArgumentTypeMismatchException ex) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .status(HttpStatus.BAD_REQUEST)
            .keyMessage(String.format("The parameter '%s' of value '%s' could not be converted to type '%s'",
                ex.getName(), ex.getValue(), Objects.requireNonNull(ex.getRequiredType()).getSimpleName()))
            .debugMessage(ex.getMessage())
            .build();
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(UserAlreadyVerifiedException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyVerifiedException(UserAlreadyVerifiedException ex) {
        return createErrorResponse(HttpStatus.BAD_REQUEST, ex, KeyExceptionMessageConstants.USER_ALREADY_VERIFIED);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        return createErrorResponse(HttpStatus.BAD_REQUEST, ex, KeyExceptionMessageConstants.BAD_CREDENTIALS);
    }

    @ExceptionHandler(GoogleCalendarException.class)
    public ResponseEntity<ErrorResponse> handleGoogleCalendarException(GoogleCalendarException ex) {
        log.error(ERROR_MESSAGE, ex.getMessage(), ex);
        return createErrorResponse(HttpStatus.BAD_REQUEST, ex, KeyExceptionMessageConstants.GOOGLE_CALENDAR);
    }

    @ExceptionHandler(SessionConflictException.class)
    public ResponseEntity<ErrorResponse> handleSessionConflictException(SessionConflictException ex) {
        log.error(ERROR_MESSAGE, ex.getMessage(), ex);
        return createErrorResponse(HttpStatus.BAD_REQUEST, ex, KeyExceptionMessageConstants.SESSION_CONFLICT);
    }

    @ExceptionHandler(SessionEditExpiredException.class)
    public ResponseEntity<ErrorResponse> handleSessionEditExpiredException(SessionEditExpiredException ex) {
        log.error(ERROR_MESSAGE, ex.getMessage(), ex);
        return createErrorResponse(HttpStatus.BAD_REQUEST, ex, KeyExceptionMessageConstants.SESSION_EDIT_EXPIRED);
    }

    @ExceptionHandler(SessionCancelException.class)
    public ResponseEntity<ErrorResponse> handleSessionCancelException(SessionCancelException ex) {
        log.error(ERROR_MESSAGE, ex.getMessage(), ex);
        return createErrorResponse(HttpStatus.BAD_REQUEST, ex, KeyExceptionMessageConstants.SESSION_CANCEL);
    }

    @ExceptionHandler({StripeException.class,SignatureVerificationException.class})
    public ResponseEntity<ErrorResponse> handleStripeException(StripeException ex) {
        log.error(ERROR_MESSAGE, ex.getMessage(), ex);
        return createErrorResponse(HttpStatus.BAD_REQUEST, ex, KeyExceptionMessageConstants.STRIPE_EXCEPTION);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        log.error(ERROR_MESSAGE, ex.getMessage(), ex);
        return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex, KeyExceptionMessageConstants.UNKNOWN_ERROR);
    }
}
