package com.appointment.booking.model;


import com.appointment.booking.enums.MatchMode;
import com.appointment.booking.enums.Operator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterModel {

    private MatchMode matchMode;
    private String value;
    private Operator operator;
}
