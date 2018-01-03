package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.repository.RoleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
internal class RoleController {

    @Autowired
    lateinit var roleRepository: RoleRepository

    @GetMapping("/roles")
    fun findAll() =
            roleRepository.findAll()



}