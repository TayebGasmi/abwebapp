package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link com.appointment.booking.entity.Payment}
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class PaymentDto extends BaseDto<Long> {

    private SessionDto session;
    private BigDecimal teacherShare;
    private BigDecimal adminShare;
    @NotNull
    private BigDecimal total;
    private Boolean isTeacherPaid;

}