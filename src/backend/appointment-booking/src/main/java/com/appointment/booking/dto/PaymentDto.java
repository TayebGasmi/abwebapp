package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Data;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link com.appointment.booking.entity.Payment}
 */
@Data
@SuperBuilder
public class PaymentDto extends BaseDto<Long> {

    @NotNull
    private SessionDto session;
    @NotNull
    private BigDecimal teacherShare;
    @NotNull
    private BigDecimal adminShare;
    @NotNull
    private BigDecimal total;
    @NotNull
    private Boolean isTeacherPaid;
}