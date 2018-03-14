package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.Child
import com.ablx.daycare.backend.repository.ChildRepository
import com.ablx.daycare.backend.repository.DaycareRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
internal class ChildController {

    @Autowired
    lateinit var childrenRepository: ChildRepository

    @Autowired
    lateinit var daycareRepository: DaycareRepository

    @GetMapping("/children/{id}")
    fun findById(@PathVariable(value="id")id: Long) =
            childrenRepository.findById(id)

    @GetMapping("/children")
    fun findAll() =
            childrenRepository.findAll()

    @GetMapping("/daycares/{idDaycare}/childs")
    fun findAllByDaycare(@PathVariable(value="idDaycare")idDaycare:Long) =
            childrenRepository.findAllByDaycare(idDaycare)

    @GetMapping("/daycares/{idDaycare}/childs/{id}")
    fun findOneByIdByDaycare(@PathVariable(value="idDaycare")idDaycare:Long,@PathVariable(value="id")idChild:Long) =
            childrenRepository.findOneByIdByDaycare(idChild,idDaycare)

    @GetMapping("/daycares/{idDaycare}/parents/{idParent}/childs")
    fun findAllByDaycareAndParentId(@PathVariable(value="idDaycare")idDaycare:Long,
                                    @PathVariable(value="idParent")idParent:Long) =
            childrenRepository.findAllByDaycare(idDaycare)

    @DeleteMapping("/daycares/{idDaycare}/childs/{id}")
    fun delete(@PathVariable(value="idDaycare")idDaycare: Long,@PathVariable(value="idDaycare")idParent: Long,@PathVariable(value="id")id: Long) :Boolean{
        childrenRepository.deleteById(id)
        return true}

    @PostMapping("/daycares/{idDaycare}/childs")
    fun create(@PathVariable(value="idDaycare")idDaycare:Long, @RequestBody  child: Child):Child {

        child.daycare = daycareRepository.findById(idDaycare).get()

        return   childrenRepository.save(child)
    }

}