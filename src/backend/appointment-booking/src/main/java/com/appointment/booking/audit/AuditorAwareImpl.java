package com.appointment.booking.audit;

import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.AuditorAware;

@Slf4j
public class AuditorAwareImpl implements AuditorAware<Long> {

    @Override
    public Optional<Long> getCurrentAuditor() {
        return Optional.empty();
    }

//    @Override
//    public Optional<Long> getCurrentAuditor() {
//        if (SecurityContextHolder.getContext() != null && SecurityContextHolder.getContext().getAuthentication() != null) {
//            if (UserPrincipal.class.isAssignableFrom(SecurityContextHolder.getContext().getAuthentication().getPrincipal().getClass())) {
//                UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//                if (userPrincipal != null) {
//                    return Optional.of(((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
//                }
//            } else {
//                log.warn("CurrentAuditor not found {}", SecurityContextHolder.getContext().getAuthentication().getPrincipal());
//            }
//        }
//
//        return Optional.of(0L);
//    }
}
