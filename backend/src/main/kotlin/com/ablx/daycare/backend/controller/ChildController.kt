package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.repository.ChildRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
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

    @GetMapping("/daycares/{idDaycare}/childs")
    fun findAllByDaycare(@PathVariable(value="idDaycare")idDaycare:Long) =
            childrenRepository.findAllByDaycare(idDaycare)

    @GetMapping("/daycares/{idDaycare}/childs/{id}")
    fun findOneByIdByDaycare(@PathVariable(value="idDaycare")id:Long,@PathVariable(value="idDaycare")idDaycare:Long) =
            childrenRepository.findOneByIdByDaycare(id,idDaycare)

    @GetMapping("/daycares/{idDaycare}/parents/{idParent}/childs")
    fun findAllByDaycareAndParentId(@PathVariable(value="idDaycare")idDaycare:Long,
                                    @PathVariable(value="idParent")idParent:Long) =
            childrenRepository.findAllByDaycare(idDaycare)


    @DeleteMapping("/daycares/{idDaycare}/parents/{idParent}/childs/{id}")
    fun delete(@PathVariable(value="idDaycare")idDaycare: Long,@PathVariable(value="idDaycare")idParent: Long,@PathVariable(value="id")id: Long) =
            childrenRepository.delete(id)

}