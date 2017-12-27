package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.enum.Role
import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController


@RestController
internal class EducatorController {

    @Autowired
    lateinit var userRepository: UserRepository

    @GetMapping("/daycares/{idDaycare}/educators")
    fun findByDaycareAndRole(@PathVariable(value = "idDaycare") idDaycare: Long) =
            userRepository.findAllByDaycareAndRole(idDaycare, Role.EDUCATOR.value)


    @GetMapping("/daycares/{idDaycare}/educators/{id}")
    fun findByDaycareAndRole(@PathVariable(value = "idDaycare") idDaycare: Long, @PathVariable(value = "id") id: Long) =
            userRepository.findOneByIdByDaycareAndRole(id, idDaycare, Role.EDUCATOR.value)

    @DeleteMapping("/daycares/{idDaycare}/educators/{id}")
    fun delete(@PathVariable(value = "idDaycare") idDaycare: Long, @PathVariable(value = "id") id: Long):Boolean {
        userRepository.delete(id)
        return true
    }


}