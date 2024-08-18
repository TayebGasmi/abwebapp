package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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
public class Subject extends BaseEntity<Long> {

    private String name;
    private String description;
    @ManyToMany()
    private Set<SchoolType> schoolTypes;
    @ManyToMany()
    private Set<SchoolYear> schoolYears;

    @ManyToMany
    @JoinTable(name = "Subject_teachers",
        joinColumns = @JoinColumn(name = "subject_id"),
        inverseJoinColumns = @JoinColumn(name = "teachers_id"))
    private Set<Teacher> teachers = new LinkedHashSet<>();


    @OneToMany(mappedBy = "subject")
    private Set<Session> sessions = new LinkedHashSet<>();

}
