package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import jakarta.persistence.Entity;
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
public class SchoolType extends BaseEntity<Long> {

    private String name;
    private String description;
    @ManyToMany(mappedBy = "schoolTypes")
    private Set<Subject> subjects;

    @OneToMany(mappedBy = "schoolType", orphanRemoval = true)
    private Set<Student> students = new LinkedHashSet<>();

}