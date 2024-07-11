package com.appointment.booking.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UniqueConstraintViolationError implements SubError {

    private String field;
    private String message;
    private Object rejectedValue;
    private String keyMessage;
}
