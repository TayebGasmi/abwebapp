package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.appointment.booking.entity.Payment}
 */
@Data
@SuperBuilder
public class PaymentDto extends BaseDto<Long> {
    SessionDto session;
    @NotNull
    BigDecimal teacherShare;
    @NotNull
    BigDecimal adminShare;
    @NotNull
    BigDecimal total;
    @NotNull
    Boolean isTeacherPaid;
}