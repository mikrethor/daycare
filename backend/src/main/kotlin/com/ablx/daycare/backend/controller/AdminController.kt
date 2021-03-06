package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.util.*


@RestController
internal class AdminController(val userRepository: UserRepository) {

//    @GetMapping("/daycare/{idDaycare}/admins")
//    fun findByDaycareAndRole(@PathVariable(value = "idDaycare") idDaycare: UUID) =
//            userRepository.findAllByDaycareAndRole(idDaycare, Role.ADMIN.value)

    @DeleteMapping("/daycares/{idDaycare}/admins/{id}")
    fun delete(@PathVariable(value = "idDaycare") idDaycare: Long, @PathVariable(value = "id") id: UUID) =
            userRepository.deleteById(id)
}