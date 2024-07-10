package com.appointment.booking.crud;


import java.util.Optional;

public interface CrudService<T, ID> {

    Iterable<T> getAll();

    Optional<T> getById(ID id);

    boolean existsById(ID id);

    T create(T entity) throws Exception;

    T update(ID id, T entity);

    void delete(ID id);
}

