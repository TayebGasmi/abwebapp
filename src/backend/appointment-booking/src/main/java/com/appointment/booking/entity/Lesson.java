package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "lesson")
@SuperBuilder
public class Lesson extends BaseEntity<Long> {

    private String title;
    private String description;
    @ManyToMany(mappedBy = "lessons")
    private Set<Teacher> teachers = new HashSet<>();

}