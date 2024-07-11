package com.appointment.booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@Table(name = "teacher")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Teacher extends User  {

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "teacher_lesson",
            joinColumns = { @JoinColumn(name = "teacher_id") },
            inverseJoinColumns = { @JoinColumn(name = "lesson_id") }
    )
    Set<Lesson> lessons = new HashSet<>();
}