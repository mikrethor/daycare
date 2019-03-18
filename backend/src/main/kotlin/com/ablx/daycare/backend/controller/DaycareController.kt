package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.repository.DaycareRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1")
internal class DaycareController(private val daycareRepository: DaycareRepository) {

    @GetMapping("/daycares/{id}")
    fun findById(@PathVariable(value = "id") id: Long) =
            daycareRepository.getOne(id)

    @GetMapping("/daycares")
    fun findAll() =
            daycareRepository.findAll()


}