package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.Educator
import com.ablx.daycare.backend.entity.User
import com.ablx.daycare.backend.enum.Role
import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


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

    @PostMapping("/daycares/{idDaycare}/educators")
    fun create(@PathVariable(value="idDaycare")idDaycare:Long, @ModelAttribute educator: User) =
            userRepository.save(educator)


}