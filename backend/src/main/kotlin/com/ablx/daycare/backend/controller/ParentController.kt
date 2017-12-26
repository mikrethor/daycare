package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.enum.Role
import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController


@RestController
internal class ParentController {

    @Autowired
    lateinit var userRepository: UserRepository

    @GetMapping("/daycares/{idDaycare}/parents")
    fun findAllByDaycareAndRole(@PathVariable(value="idDaycare")idDaycare: Long) =
            userRepository.findAllByDaycareAndRole(idDaycare, Role.PARENT.value)

    @GetMapping("/daycares/{idDaycare}/parents/{idParent}")
    fun findOneByDaycareAndRole(@PathVariable(value="idDaycare")idDaycare: Long,
                             @PathVariable(value="idParent")id: Long) =
            userRepository.findOneByIdByDaycareAndRole(id,idDaycare, Role.PARENT.value)

    @DeleteMapping("/daycares/{idDaycare}/parents/{id}")
    fun delete(@PathVariable(value="idDaycare")idDaycare: Long,@PathVariable(value="id")id: Long) =
            userRepository.delete(id)

}