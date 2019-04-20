package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.User
import com.ablx.daycare.backend.enum.Role
import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.web.bind.annotation.*
import java.util.*


@RestController
internal class EducatorController(val userRepository: UserRepository) {

    @GetMapping("/daycares/{idDaycare}/educators")
    fun findByDaycareAndRole(@PathVariable(value = "idDaycare") idDaycare: UUID) =
            userRepository.findAllByDaycareAndRole(idDaycare, Role.EDUCATOR.value)

    @GetMapping("/daycares/{idDaycare}/educators/{id}")
    fun findByDaycareAndRole(@PathVariable(value = "idDaycare") idDaycare: UUID, @PathVariable(value = "id") id: UUID) =
            userRepository.findOneByIdByDaycareAndRole(id, idDaycare, Role.EDUCATOR.value)

    @DeleteMapping("/daycares/{idDaycare}/educators/{id}")
    fun delete(@PathVariable(value = "idDaycare") idDaycare: UUID, @PathVariable(value = "id") id: UUID): Boolean {
        userRepository.deleteById(id)
        return true
    }

    @PostMapping("/daycares/{idDaycare}/educators")
    fun create(@PathVariable(value="idDaycare")idDaycare:Long, @RequestBody educator: User) :User {
        return userRepository.save(educator)
    }
}