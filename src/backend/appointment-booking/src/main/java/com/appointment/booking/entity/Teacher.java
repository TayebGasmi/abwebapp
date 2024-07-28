package com.appointment.booking.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.HashSet;
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
public class Teacher extends User {

    @Column(name = "pay_rate", nullable = false, precision = 19, scale = 2)
    private BigDecimal payRate;

    @ManyToMany(mappedBy = "teachers")
    private Set<Subject> subjects = new LinkedHashSet<>();

    @OneToMany(mappedBy = "teacher", orphanRemoval = true)
    private Set<Session> sessions = new LinkedHashSet<>();

}
