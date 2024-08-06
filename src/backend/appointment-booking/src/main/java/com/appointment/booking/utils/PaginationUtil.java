package com.appointment.booking.utils;


import com.appointment.booking.base.BaseMapper;
import com.appointment.booking.enums.SortOrder;
import com.appointment.booking.model.PageData;
import com.appointment.booking.model.PageLink;
import java.util.List;
import java.util.Objects;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PaginationUtil {

    private PaginationUtil() {
    }

    public static <T> PageData<T> paginate(Page page, BaseMapper mapper) {
        List<T> data = mapper.convertEntitiesToDtos(page.getContent());
        return createPageData(page, data);
    }

    private static <T> PageData<T> createPageData(Page<T> page, List<T> data) {
        return new PageData<>(
            data, page.getTotalPages(), Math.toIntExact(page.getTotalElements()), page.hasNext());
    }

    public static Pageable toPageable(PageLink pageLink) {
        Sort sort = Sort.unsorted();
        if (Objects.nonNull(pageLink.getSortProperty())) {
            sort = Sort.by(pageLink.getSortProperty());
            sort = pageLink.getSortOrder() == SortOrder.DESC ? sort.descending() : sort.ascending();
        }
        return PageRequest.of(pageLink.getPage(), pageLink.getPageSize(), sort);
    }
}
