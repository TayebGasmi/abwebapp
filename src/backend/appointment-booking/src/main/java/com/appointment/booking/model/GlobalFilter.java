package com.appointment.booking.model;

import java.util.List;
import lombok.Data;

@Data
public class GlobalFilter {

    private List<String> keys;
    private String value;
}
