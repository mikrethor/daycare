package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.Child
import com.ablx.daycare.backend.repository.ChildRepository
import com.ablx.daycare.backend.repository.DaycareRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*


@RestController
internal class ChildController {

    @Autowired
    lateinit var childrenRepository: ChildRepository

    @Autowired
    lateinit var daycareRepository: DaycareRepository

    @GetMapping("/children/{id}")
    fun findById(@PathVariable(value = "id") id: UUID) =
            childrenRepository.getOne(id)

    @GetMapping("/children")
    fun findAll() =
            childrenRepository.findAll()

    @GetMapping("/daycares/{idDaycare}/childs")
    fun findAllByDaycare(@PathVariable(value = "idDaycare") idDaycare: UUID) =
            childrenRepository.findAllByDaycare(idDaycare)

    @GetMapping("/daycares/{idDaycare}/childs/{id}")
    fun findOneByIdByDaycare(@PathVariable(value = "idDaycare") idDaycare: UUID, @PathVariable(value = "id") idChild: UUID) =
            childrenRepository.findOneByIdByDaycare(idChild, idDaycare)

    @GetMapping("/daycares/{idDaycare}/parents/{idParent}/childs")
    fun findAllByDaycareAndParentId(@PathVariable(value = "idDaycare") idDaycare: UUID,
                                    @PathVariable(value = "idParent") idParent: UUID) =
            childrenRepository.findAllByDaycare(idDaycare)

    @DeleteMapping("/daycares/{idDaycare}/childs/{id}")
    fun delete(@PathVariable(value = "idDaycare") idDaycare: UUID, @PathVariable(value = "idDaycare") idParent: UUID, @PathVariable(value = "id") id: UUID): Boolean {
        childrenRepository.deleteById(id)
        return true
    }

    @PostMapping("/daycares/{idDaycare}/childs")
    fun create(@PathVariable(value = "idDaycare") idDaycare: UUID, @RequestBody child: Child): Child {

        child.daycare = daycareRepository.getOne(idDaycare)

        return childrenRepository.save(child)
    }

}