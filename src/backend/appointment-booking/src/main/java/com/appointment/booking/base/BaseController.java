package com.appointment.booking.base;


import com.appointment.booking.model.PageData;
import com.appointment.booking.model.PageLink;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


public abstract class BaseController<E extends BaseEntity<I>, I extends Serializable, D extends BaseDto<I>> {


    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private BaseServiceImpl<E, I, D> baseService;

    @Operation(summary = "Save new entity ")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Entity created"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid input")})

    @PostMapping
    public ResponseEntity<D> save(@RequestBody @Valid D dto) {
        return new ResponseEntity<>(baseService.add(dto), HttpStatus.CREATED);
    }

    @Operation(summary = "Get entity by id")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Found the entity"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid id supplied"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Entity not found")})
    @Parameters(value = {
        @Parameter(name = "id", description = "Id of entity to be searched", required = true, example = "1", schema = @Schema(implementation = Long.class))})
    @GetMapping("/{id}")
    public ResponseEntity<D> getById(@PathVariable I id) {
        return new ResponseEntity<>(baseService.findById(id), HttpStatus.OK);
    }

    @Operation(summary = "Update entity by id")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Found the entity"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid id supplied"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Entity not found")})
    @Parameters(value = {
        @Parameter(name = "id", description = "Id of entity to be searched", required = true, example = "1", schema = @Schema(implementation = Long.class))})
    @PatchMapping("/{id}")
    public ResponseEntity<D> update(@PathVariable I id, @Valid @RequestBody D dto) {

        return new ResponseEntity<>(baseService.update(dto), HttpStatus.OK);
    }

    @Operation(summary = "Delete entity by id")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Entity deleted"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Entity not found")})
    @Parameters(value = {
        @Parameter(name = "id", description = "Id of entity to be searched", required = true, example = "1", schema = @Schema(implementation = Long.class))})

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable I id) {
        baseService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Get all entities with pagination")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Found the entity"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Entity not found")})
    @PostMapping("/find")
    public ResponseEntity<PageData<D>> findAll(@RequestBody PageLink pageLink) {
        return new ResponseEntity<>(baseService.findAll(pageLink), HttpStatus.OK);
    }

    @Operation(summary = "Get all entities no pagination provided")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Found the entity"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Entity not found")})
    @GetMapping()
    public ResponseEntity<List<D>> getAll() {
        return new ResponseEntity<>(baseService.getAll(), HttpStatus.OK);
    }

    @Operation(summary = "Delete all Entities")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Found the entity"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Entity not found")})
    @DeleteMapping("/deleteall")
    public ResponseEntity<Void> deleteAll() {
        baseService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Delete all Entities by ids")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Found the entity"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Entity not found")})
    @PostMapping("/deleteallByIds")
    public ResponseEntity<Void> deleteAllByIds(@RequestBody List<E> ids) {
        baseService.deleteAllByIds(ids);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
