package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.appointment.booking.entity.Payment}
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
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