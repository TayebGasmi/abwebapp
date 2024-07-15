package com.appointment.booking.base;

import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;

public interface BaseMapper<E extends BaseEntity, D extends BaseDto> {


    D convertEntityToDto(E entity);

    E convertDtoToEntity(D dto);

    List<D> convertEntitiesToDtos(List<E> entities);

    List<E> convertDtosToEntities(List<D> entities);

    /**
     * Partially updates an entity based on the provided data transfer object (DTO).
     *
     * @param entity The entity to be partially updated.
     * @param dto    The data transfer object containing the partial updates. It should only include the fields that need to be updated in the entity.
     */


    @BeanMapping(nullValuePropertyMappingStrategy = IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
    void partialUpdate(@MappingTarget E entity, D dto);


}
