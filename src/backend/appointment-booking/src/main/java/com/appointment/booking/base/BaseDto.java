package com.appointment.booking.base;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BaseDto<I> implements Serializable {


    private I id;


    private LocalDateTime createdDate;

    private LocalDateTime lastModifiedDate;
}
