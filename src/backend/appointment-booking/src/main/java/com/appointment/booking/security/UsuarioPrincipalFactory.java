package com.appointment.booking.security;

import com.appointment.booking.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

public class UsuarioPrincipalFactory {

    public static UsuarioPrincipal build(User user){
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getRole().getRoleName().toString()));
        return new UsuarioPrincipal(user.getEmail(), user.getPassword(), authorities);
    }
}
