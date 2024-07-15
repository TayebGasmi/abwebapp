package com.appointment.booking.controller;

import com.appointment.booking.base.BaseController;
import com.appointment.booking.dto.RoleDTO;
import com.appointment.booking.entity.Role;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Roles")
public class RoleController extends BaseController<Role, Long, RoleDTO> {

}
