package com.appointment.booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import lombok.experimental.SuperBuilder;

@Getter
@Setter

@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Student extends User {

    private Date yearOfstudy;
    @OneToOne
    @JoinColumn(name = "school_id", referencedColumnName = "id")
    private School school;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Session> sessions = new HashSet<>();




}