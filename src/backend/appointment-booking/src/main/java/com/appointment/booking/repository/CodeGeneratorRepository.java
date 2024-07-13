package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.CodeGenerator;
import com.appointment.booking.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CodeGeneratorRepository extends BaseRepository<CodeGenerator,Long> {
    Optional<CodeGenerator> findCodeGeneratorByUserAndCode(User user, String code);
}
