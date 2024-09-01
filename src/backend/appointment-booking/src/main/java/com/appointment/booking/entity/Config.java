package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import com.appointment.booking.enums.ConfigType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
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
@Table(name = "config")
public class Config extends BaseEntity<Long> {

    private String key;
    private String value;
    private String description;

    @Enumerated(EnumType.STRING)
    private ConfigType valueType;
}