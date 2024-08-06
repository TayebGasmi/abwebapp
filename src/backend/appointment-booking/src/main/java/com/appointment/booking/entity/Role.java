package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import com.appointment.booking.enums.RoleType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotNull;
import java.util.LinkedHashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Role extends BaseEntity<Long> {


    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(unique = true, nullable = false)
    private RoleType name;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<User> users = new LinkedHashSet<>();

}