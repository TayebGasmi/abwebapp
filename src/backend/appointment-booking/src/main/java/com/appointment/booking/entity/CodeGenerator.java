package com.appointment.booking.entity;

import com.appointment.booking.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@Table(name = "code_generator")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class CodeGenerator extends BaseEntity<Long> {

    private String code;
    private LocalDateTime expirationDate;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}