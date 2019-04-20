package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.enum.Role
import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.util.*


@RestController
internal class ParentController(val userRepository: UserRepository) {

    @GetMapping("/daycares/{idDaycare}/parents")
    fun findAllByDaycareAndRole(@PathVariable(value = "idDaycare") idDaycare: UUID) =
            userRepository.findAllByDaycareAndRole(idDaycare, Role.PARENT.value)

    @GetMapping("/daycares/{idDaycare}/parents/{idParent}")
    fun findOneByDaycareAndRole(@PathVariable(value = "idDaycare") idDaycare: UUID,
                                @PathVariable(value = "idParent") id: UUID) =
            userRepository.findOneByIdByDaycareAndRole(id,idDaycare, Role.PARENT.value)

    @DeleteMapping("/daycares/{idDaycare}/parents/{id}")
    fun delete(@PathVariable(value = "idDaycare") idDaycare: Long, @PathVariable(value = "id") id: UUID) =
            userRepository.deleteById(id)
}