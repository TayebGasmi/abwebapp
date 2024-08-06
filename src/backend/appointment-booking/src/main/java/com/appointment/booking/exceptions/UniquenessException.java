package com.appointment.booking.exceptions;

import java.util.Set;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UniquenessException extends RuntimeException {

    private final Set<SubError> uniqueConstraintViolationExceptions;

    public UniquenessException(Set<SubError> uniqueConstraintViolationExceptions) {
        this.uniqueConstraintViolationExceptions = uniqueConstraintViolationExceptions;
    }
}
