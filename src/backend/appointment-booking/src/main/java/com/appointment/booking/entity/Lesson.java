package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
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