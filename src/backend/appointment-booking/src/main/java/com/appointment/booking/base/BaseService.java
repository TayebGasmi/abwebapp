package com.appointment.booking.base;



import com.appointment.booking.model.PageData;
import com.appointment.booking.model.PageLink;
import java.io.Serializable;


public interface BaseService<E extends BaseEntity, I extends Serializable, D extends BaseDto> {

    D add(D dto) throws Exception;

    D updateById(I id, D dto);

    D findById(I id);

    void deleteById(I id);

    PageData<D> findAll(PageLink pageLink);




}
