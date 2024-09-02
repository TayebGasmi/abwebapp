package com.appointment.booking.base;


import com.appointment.booking.exceptions.SessionEditExpiredException;
import com.appointment.booking.model.PageData;
import com.appointment.booking.model.PageLink;
import java.io.Serializable;
import java.util.List;


public interface BaseService<E extends BaseEntity<I>, I extends Serializable, D extends BaseDto<I>> {

    D add(D dto);

    D update(D dto) throws SessionEditExpiredException;

    D findById(I id);

    void deleteById(I id);

    PageData<D> findAll(PageLink pageLink);

    List<D> getAll();

    void deleteAll();

    void deleteAllByIds(List<E> entities);
}
