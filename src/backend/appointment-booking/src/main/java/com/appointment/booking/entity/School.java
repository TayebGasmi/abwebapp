package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@Table(name = "school")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class School extends BaseEntity<Long> {

    private Long id;
    private String name;
    private String type;
}