package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.*;

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
public class Session extends BaseEntity<Long> {
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;
    @Column(name = "session_start_date", nullable = false)
    private LocalDateTime startTime;
    @Column(name = "session_ending_date", nullable = false)
    private LocalDateTime endTime;
    @Column(nullable = false)
    private String sessionLink;
    @Column(nullable = false)
    private int capacity;

    @ElementCollection
    private List<String> tags;
    @ManyToOne
    @JoinColumn(name = "lesson_id"/*, nullable = false*/)
    private Lesson lesson;

    @ManyToMany
    @JoinTable(
        name = "session_student",
        joinColumns = @JoinColumn(name = "session_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<Student> students = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "teacher_id" /*nullable = false*/)
    private Teacher teacher;

    @Column(nullable = false)
    private String status;

}
