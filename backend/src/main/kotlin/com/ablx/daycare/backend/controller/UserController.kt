package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.User
import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.web.bind.annotation.*
import java.util.*


@RestController
internal class UserController(val userRepository: UserRepository) {



    //Name can't contain .
    @GetMapping("/users/{name:.+}")
    fun findByName(@PathVariable(value = "name") name: String) =
            userRepository.findByUsername(name)

    @GetMapping("/users/role/{idRole}/daycares/{idDaycare}")
    fun findAllByDaycareAndRole(@PathVariable(value = "idDaycare") idDaycare: UUID, @PathVariable(value = "idRole") idRole: Long) =
            userRepository.findAllByDaycareAndRole(idDaycare, idRole)

    @GetMapping("/daycares/{idDaycare}/users")
    fun findAllByDaycare(@PathVariable(value = "idDaycare") idDaycare: UUID) =
            userRepository.findAllByDaycare(idDaycare)

    @GetMapping("/daycares/{idDaycare}/users/{idUser}")
    fun findOneByDaycareAndIdUser(@PathVariable(value = "idDaycare") idDaycare: UUID,
                                  @PathVariable(value = "idUser") idUser: UUID) =
            userRepository.findOneByIdByDaycare(idUser, idDaycare)

    @PostMapping("/daycares/{idDaycare}/users")
    fun create(@PathVariable(value = "idDaycare") idDaycare: UUID, @RequestBody user: User): User {
        user.id = UUID.randomUUID()
        return userRepository.save(user)
    }

    @DeleteMapping("/daycares/{idDaycare}/users/{idUser}")
    fun delete(@PathVariable(value = "idDaycare") idDaycare: UUID,
               @PathVariable(value = "idUser") idUser: UUID): Boolean {
        userRepository.deleteById(idUser)
        return true
    }


}