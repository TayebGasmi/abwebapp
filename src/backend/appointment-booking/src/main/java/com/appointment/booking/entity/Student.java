package com.appointment.booking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.HashSet;
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
public class Student extends User {

    private Date yearOfStudy;

    @OneToOne
    @JoinColumn(name = "school_id", referencedColumnName = "id")
    private School school;

    @ManyToMany(mappedBy = "students")
    private Set<Session> sessions = new HashSet<>();
}
