package com.appointment.booking.crud;

import com.appointment.booking.dto.RoleDTO;
import com.appointment.booking.model.Role;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.el.util.ReflectionUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.*;
import java.util.stream.Collectors;

public abstract class CrudController<T, ID> {

    private final CrudService<T, ID> service;

    protected CrudController(CrudService<T, ID> service) {
        this.service = service;
    }

    @GetMapping("/all")
    public Iterable<T> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable ID id) {
        Optional<T> optionalEntity = service.getById(id);
        return optionalEntity.map(entity -> new ResponseEntity<>(entity, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public T create(@RequestBody T entity) throws Exception{
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable ID id, @RequestBody T entity) {
        service.update(id, entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<T> partialUpdate(@PathVariable ID id, @RequestBody Map<String, Object> tbody) {
        return service.getById(id)
                .map(entity -> {
                    tbody.forEach((key, value) -> {
                        Field field = ReflectionUtils.findField(entity.getClass(), key);
                        if (field.getName().equals("roles")) {
                            field.setAccessible(true);
                            ObjectMapper objectMapper = new ObjectMapper();
                            try {
                                String jsonString = objectMapper.writeValueAsString(value);
                                Role[] roles = objectMapper.readValue(jsonString, Role[].class);
                                Set<Role> rolesSet = new HashSet<>(List.of(roles));
                                ReflectionUtils.setField(field, entity, rolesSet);
                            } catch (JsonProcessingException e) {
                                throw new RuntimeException(e);
                            }
                        } else {
                            field.setAccessible(true);
                            ReflectionUtils.setField(field, entity, value);
                        }
                    });
                    service.update(id, entity);
                    return new ResponseEntity<>(entity, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        if (!service.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
