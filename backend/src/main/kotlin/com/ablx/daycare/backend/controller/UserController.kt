package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.Daycare
import com.ablx.daycare.backend.entity.User
import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController


@RestController
internal class UserController{

    @Autowired
    lateinit var userRepository:UserRepository


    @GetMapping("/users")
    fun users() =
            listOf<User>(User(1L, "xbouclet","","Xavier","Bouclet", emptyList(), Daycare()))


    //Name can't contain .
    @GetMapping("/users/{name}")
    fun findById(@PathVariable(value="name")name: String) =
            userRepository.findByUsername(name)

}