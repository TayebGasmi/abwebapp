package com.appointment.booking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "teacher")
public class Teacher extends User {

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "teacher_lesson",
            joinColumns = { @JoinColumn(name = "teacher_id") },
            inverseJoinColumns = { @JoinColumn(name = "lesson_id") }
    )
    Set<Lesson> lessons = new HashSet<>();
}