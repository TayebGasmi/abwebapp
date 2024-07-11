package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import com.appointment.booking.enums.RoleName;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@Table(name = "role")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Role extends BaseEntity<Long> {


    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(unique = true, nullable = false)
    private RoleName roleName;



}