package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.repository.DaycareRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController


@RestController
internal class DaycareController {

    @Autowired
    lateinit var daycareRepository:DaycareRepository

    @GetMapping("/daycares/{id}")
    fun findById(@PathVariable(value="id")id: Long) =
            daycareRepository.findById(id)

    @GetMapping("/daycares")
    fun findAll() =
            daycareRepository.findAll()


}