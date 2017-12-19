package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.repository.ChildRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController


@RestController
internal class ChildController {

    @Autowired
    lateinit var childrenRepository: ChildRepository

    @GetMapping("/children/{id}")
    fun findById(@PathVariable(value="id")id: Long) =
            childrenRepository.findOne(id)

    @GetMapping("/children")
    fun findAll() =
            childrenRepository.findAll()

    @GetMapping("/daycares/{idDaycare}/children")
    fun findAllByDaycare(@PathVariable(value="idDaycare")idDaycare:Long) =
            childrenRepository.findAllByDaycare(idDaycare)


}