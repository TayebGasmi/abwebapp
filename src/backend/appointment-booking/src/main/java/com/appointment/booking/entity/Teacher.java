package com.appointment.booking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Teacher extends User {

    @Column(name = "pay_rate", nullable = false, precision = 19, scale = 2)
    private BigDecimal payRate;
    @OneToMany(mappedBy = "teacher")
    private Set<Session> sessions = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "Teacher_subjects",
        joinColumns = @JoinColumn(name = "teacher_id"),
        inverseJoinColumns = @JoinColumn(name = "subjects_id"))
    private Set<Subject> subjects = new LinkedHashSet<>();

    public void setParentProperties(User user) {
        BeanUtils.copyProperties(user, this);
    }

}
