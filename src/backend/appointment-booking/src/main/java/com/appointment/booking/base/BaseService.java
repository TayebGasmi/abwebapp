package com.appointment.booking.base;


import com.appointment.booking.model.PageData;
import com.appointment.booking.model.PageLink;
import java.io.IOException;
import java.io.Serializable;
import java.util.List;


public interface BaseService<E extends BaseEntity<I>, I extends Serializable, D extends BaseDto<I>> {

    D add(D dto) throws IOException;

    D update(D dto);

    D findById(I id);

    void deleteById(I id);

    PageData<D> findAll(PageLink pageLink);

    List<D> getAll();

    void deleteAll();

    void deleteAllByIds(List<E> entities);
}
