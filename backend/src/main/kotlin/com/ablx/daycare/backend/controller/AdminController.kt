package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.enum.Role
import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController


@RestController
internal class AdminController {

    @Autowired
    lateinit var userRepository: UserRepository

    @GetMapping("/daycare/{idDaycare}/admins")
    fun findByDaycareAndRole(@PathVariable(value="idDaycare")idDaycare: Long) =
            userRepository.findAllByDaycareAndRole(idDaycare, Role.ADMIN.value)

    @DeleteMapping("/daycares/{idDaycare}/admins/{id}")
    fun delete(@PathVariable(value="idDaycare")idDaycare: Long,@PathVariable(value="id")id: Long) =
            userRepository.deleteById(id)
}