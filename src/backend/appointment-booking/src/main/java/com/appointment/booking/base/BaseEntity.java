package com.appointment.booking.base;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder(builderMethodName = "baseEntityBuilder")
public class BaseEntity<I extends Serializable> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private I id;

    @CreatedDate
    @Temporal(value = TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Long createdDate;

    @LastModifiedDate
    @Temporal(value = TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Long lastModifiedDate;
}
