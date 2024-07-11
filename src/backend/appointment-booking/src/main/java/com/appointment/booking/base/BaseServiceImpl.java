package com.appointment.booking.base;


import com.appointment.booking.exceptions.NotFoundException;
import com.appointment.booking.model.FilterModel;
import com.appointment.booking.model.PageData;
import com.appointment.booking.model.PageLink;
import com.appointment.booking.utils.FilterUtil;
import com.appointment.booking.utils.PaginationUtil;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
public class BaseServiceImpl<E extends BaseEntity<I>, I extends Serializable, D extends BaseDto> implements BaseService<E, I, D> {

    public static final String ENTITY_NOT_FOUND_FORMAT = "%s with id: %s not found";
    private final String entityClassName = ((Class<E>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]).getSimpleName();
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private BaseRepository<E, I> repository;
    @Autowired
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    private BaseMapper<E, D> mapper;


    @Override
    @Transactional
    public D add(D dto) throws Exception {
        E entity = mapper.convertDtoToEntity(dto);
        return mapper.convertEntityToDto(repository.save(entity));
    }

    @Override
    @Transactional
    public D updateById(I id, D dto) {
        E entity = repository.findById(id).orElseThrow(() -> new NotFoundException(String.format(ENTITY_NOT_FOUND_FORMAT, entityClassName, id)));
        entity = mapper.convertDtoToEntity(dto);
        return mapper.convertEntityToDto(repository.save(entity));
    }

    @Override
    @Transactional
    public void deleteById(I id) {
        findById(id);
        repository.deleteById(id);
    }

    @Override
    public D findById(I id) {
        return repository.findById(id).map(mapper::convertEntityToDto)
            .orElseThrow(() -> new NotFoundException(String.format(ENTITY_NOT_FOUND_FORMAT, entityClassName, id)));
    }

    @Override
    public PageData<D> findAll(PageLink pageLink) {
        Map<String, List<FilterModel>> filters = Optional.ofNullable(pageLink.getFilters()).orElse(Collections.emptyMap());
        Pageable pageable = PaginationUtil.toPageable(pageLink);
        if (Objects.isNull(pageLink.getGlobalFilter()) && filters.isEmpty()) {
            return paginateData(null, pageable);
        }
        if (Objects.isNull(pageLink.getGlobalFilter())) {
            Specification<E> specification = FilterUtil.filter(filters);
            return paginateData(specification, pageable);
        }
        Specification<E> specification = FilterUtil.filter(filters, pageLink.getGlobalFilter());
        return paginateData(specification, pageable);
    }

    private PageData<D> paginateData(Specification<E> specification, Pageable pageable) {
        Page<E> resultPage = repository.findAll(specification, pageable);
        return PaginationUtil.paginate(resultPage, mapper);
    }


}
