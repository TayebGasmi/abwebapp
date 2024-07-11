package com.appointment.booking.base;

import java.io.Serializable;
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


    private Long createdDate;

    private Long lastModifiedDate;
}
