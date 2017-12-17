package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController


@RestController
internal class UserController{

    @Autowired
    lateinit var userRepository:UserRepository

    //Name can't contain .
    @GetMapping("/users/{name}")
    fun findByName(@PathVariable(value="name")name: String) =
            userRepository.findByUsername(name)

    @GetMapping("/users/role/{idRole}/daycare/{idDaycare}")
    fun findByDaycareAndRole(@PathVariable(value="idDaycare")idDaycare: Long,@PathVariable(value="idRole")idRole: Long) =
            userRepository.findAllByDaycareAndRole(idDaycare,idRole)

}