package com.appointment.booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "teacher")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Teacher extends User {

    @OneToOne
    @JoinColumn(name = "school_id", referencedColumnName = "id")
    private School school;

    @ManyToMany()
    @JoinTable(
        name = "teacher_lesson",
        joinColumns = @JoinColumn(name = "teacher_id"),
        inverseJoinColumns = @JoinColumn(name = "lesson_id")
    )
    private Set<Lesson> lessons = new HashSet<>();
}
