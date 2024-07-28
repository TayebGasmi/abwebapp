package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
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
@Table(name = "payment")
public class Payment extends BaseEntity<Long> {

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "session_id")
    private Session session;

    @Column(name = "teacher_share", nullable = false, precision = 19, scale = 2)
    private BigDecimal teacherShare;
    @Column(name = "admin_share", nullable = false, precision = 19, scale = 2)
    private BigDecimal adminShare;
    @Column(name = "total", nullable = false, precision = 19, scale = 2)
    private BigDecimal total;
    @Column(nullable = false)
    private Boolean isTeacherPaid = false;


}