package com.appointment.booking.dto;

import com.appointment.booking.base.BaseDto;
import com.appointment.booking.enums.SessionStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * DTO for {@link com.appointment.booking.entity.Session}
 */
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class SessionDto extends BaseDto<Long> {


    private String title;
    @NotBlank
    @NotNull
    @FutureOrPresent
    private ZonedDateTime startDateTime;
    private ZonedDateTime endDateTime;
    private String meetingLink;
    private BigDecimal price;
    private SessionStatus status;
    private TeacherDto teacher;
    private StudentDto student;
    private String description;
    private Long duration;


}