package com.appointment.booking.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.Collections;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageData<T> {

    private final List<T> data;
    private final int totalPages;
    private final int totalElements;
    private final boolean hasNext;

    public PageData() {
        this(Collections.emptyList(), 0, 0, false);
    }

    @JsonCreator
    public PageData(List<T> data, int totalPages, int totalElements, boolean hasNext) {
        this.data = data;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.hasNext = hasNext;
    }


}

