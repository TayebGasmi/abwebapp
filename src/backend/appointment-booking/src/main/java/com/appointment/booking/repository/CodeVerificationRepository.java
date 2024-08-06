package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.VerificationCode;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeVerificationRepository extends BaseRepository<VerificationCode, Long> {

    void deleteByUserEmail(String email);

    Optional<VerificationCode> findByUserEmailAndCode(String email, String code);
}
