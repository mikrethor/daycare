package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.User
import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
internal class UserController{

    @Autowired
    lateinit var userRepository:UserRepository

    //Name can't contain .
    @GetMapping("/users/{name:.+}")
    fun findByName(@PathVariable(value="name")name: String) =
            userRepository.findByUsername(name)

    @GetMapping("/users/role/{idRole}/daycares/{idDaycare}")
    fun findAllByDaycareAndRole(@PathVariable(value="idDaycare")idDaycare: Long,@PathVariable(value="idRole")idRole: Long) =
            userRepository.findAllByDaycareAndRole(idDaycare,idRole)

    @GetMapping("/daycares/{idDaycare}/users")
    fun findAllByDaycare(@PathVariable(value="idDaycare")idDaycare: Long) =
            userRepository.findAllByDaycare(idDaycare)

    @GetMapping("/daycares/{idDaycare}/users/{idUser}")
    fun findOneByDaycareAndIdUser(@PathVariable(value="idDaycare")idDaycare: Long,
                                  @PathVariable(value="idUser")idUser: Long) =
            userRepository.findOneByIdByDaycare(idUser,idDaycare)

    @PostMapping("/daycares/{idDaycare}/users")
    fun create(@PathVariable(value="idDaycare")idDaycare:Long, @RequestBody user: User) : User {
        if (user.id > 0) {
            var optionalUserFromDatabase = userRepository.findById(user.id)

            var userFromDatabase = optionalUserFromDatabase.get()
            user.password=userFromDatabase.password
            userFromDatabase=userRepository.save(user)
            userFromDatabase.password=""
            return userFromDatabase
        }
        return userRepository.save(user)
    }

    @DeleteMapping("/daycares/{idDaycare}/users/{idUser}")
    fun delete(@PathVariable(value="idDaycare")idDaycare: Long,
               @PathVariable(value="idUser")idUser: Long) :Boolean{
        userRepository.deleteById(idUser)
        return true
    }



}