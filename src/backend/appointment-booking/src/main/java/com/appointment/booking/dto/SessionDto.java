package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.appointment.booking.enums.SessionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.appointment.booking.entity.Session}
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class SessionDto extends BaseDto<Long> {
    String title;
    String description;
    LocalDateTime startTime;
    String meetingLink;
    BigDecimal price;
    Long duration;
    SessionStatus status;
    TeacherDto teacher;
    StudentDto student;
}