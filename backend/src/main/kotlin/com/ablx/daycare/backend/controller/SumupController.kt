package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.repository.ChildRepository
import com.ablx.daycare.backend.repository.SumupRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.util.*


@RestController
internal class SumupController {

    @Autowired
    lateinit var sumupRepository: SumupRepository

    @Autowired
    lateinit var childRepository: ChildRepository

    @GetMapping("/daycares/{idDaycare}/childs/{idChild}/sumups/day/{day}")
    fun findOne(@PathVariable(value="idDaycare")idDaycare: Long,
                @PathVariable(value="idChild")idChild: Long,
                @PathVariable(value="day")day: Calendar) =
            sumupRepository.findOneByChildAndDay(idChild,day)

    @GetMapping("/daycares/{idDaycare}/childs/{idChild}/sumups")
    fun findAll(@PathVariable(value="idDaycare")idDaycare: Long,
                @PathVariable(value="idChild")idChild: Long) =
            sumupRepository.findAllByChildOrderByDayDesc(childRepository.findOne(idChild))
}