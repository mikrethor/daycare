package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.repository.RoleRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
internal class RoleController(val roleRepository: RoleRepository) {

    @GetMapping("/roles")
    fun findAll() =
            roleRepository.findAll()



}