package com.appointment.booking.repository;

import com.appointment.booking.base.BaseRepository;
import com.appointment.booking.entity.Role;
import com.appointment.booking.enums.RoleName;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends BaseRepository<Role, Long> {

    Optional<Role> findByRoleName(RoleName roleName);

}