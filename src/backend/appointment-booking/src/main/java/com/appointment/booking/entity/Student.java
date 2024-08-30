package com.appointment.booking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Student extends User {

    @ManyToOne
    @JoinColumn(name = "school_type_id")
    private SchoolType schoolType;
    @ManyToOne()
    @JoinColumn(name = "school_year_id")
    private SchoolYear schoolYear;
    @OneToMany(mappedBy = "student")
    private Set<Session> sessions = new LinkedHashSet<>();

    public void setParentProperties(User user) {
        BeanUtils.copyProperties(user, this);
    }

}
