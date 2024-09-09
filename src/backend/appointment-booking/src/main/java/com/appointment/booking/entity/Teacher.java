package com.appointment.booking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal payRate;
    @OneToMany(mappedBy = "teacher")
    private Set<Session> sessions = new LinkedHashSet<>();
    @Column(nullable = false)
    private boolean confirmedByAdmin = false;
    @ManyToMany
    private Set<Subject> subjects = new LinkedHashSet<>();

    public void setParentProperties(User user) {
        BeanUtils.copyProperties(user, this);
    }

}
