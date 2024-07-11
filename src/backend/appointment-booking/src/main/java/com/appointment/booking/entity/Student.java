package com.appointment.booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Student extends User {

    private Date yearOfStudy;

    @OneToOne
    @JoinColumn(name = "school_id", referencedColumnName = "id")
    private School school;

    @ManyToMany (mappedBy = "students")
    private Set<Session> sessions = new HashSet<>();
}
