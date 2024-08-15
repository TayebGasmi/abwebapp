package com.appointment.booking.base;

import java.io.Serializable;
import java.time.ZonedDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BaseDto<I extends Serializable> implements Serializable {


    private I id;


    private ZonedDateTime createdDate;

    private ZonedDateTime lastModifiedDate;
}
