package com.appointment.booking.model;


import com.appointment.booking.enums.SortOrder;
import java.util.List;
import java.util.Map;
import lombok.Data;

@Data
public class PageLink {

    private int page;
    private int pageSize;
    private String sortProperty;
    private SortOrder sortOrder;
    private String timeZone;
    private Map<String, List<FilterModel>> filters;
    private GlobalFilter globalFilter;

}
