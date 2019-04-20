package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.Sumup
import com.ablx.daycare.backend.objects.Level
import com.ablx.daycare.backend.repository.ChildRepository
import com.ablx.daycare.backend.repository.SumupRepository
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.*
import java.util.*


@RestController
internal class SumupController(val sumupRepository: SumupRepository,
                               val childRepository: ChildRepository) {

    @GetMapping("/daycares/{idDaycare}/childs/{idChild}/sumups/day/{day}")
    fun findOne(@PathVariable(value = "idDaycare") idDaycare: UUID,
                @PathVariable(value = "idChild") idChild: UUID,
                @DateTimeFormat(pattern = "yyyy-MM-dd")
                @PathVariable(value = "day") day: Calendar): Sumup {

        //TODO refactoring deport creation in front
        return try {
            sumupRepository.findOneByChildAndDay(idChild, day)
        } catch (e: Exception) {
            System.err.println(e)
            Sumup(id = UUID.randomUUID(),
                    child = childRepository.getOne(idChild),
                    mood = Level.BAD,
                    appetite = Level.BAD,
                    sleep = Level.BAD)
        }
    }

    @GetMapping("/daycares/{idDaycare}/childs/{idChild}/sumups")
    fun findAll(@PathVariable(value = "idDaycare") idDaycare: UUID,
                @PathVariable(value = "idChild") idChild: UUID) =
            sumupRepository.findAllByChildOrderByDayDesc(childRepository.getOne(idChild))

    @PostMapping("/daycares/{idDaycare}/childs/{idChild}/sumups")
    fun create(@PathVariable(value = "idDaycare") idDaycare: UUID,
               @PathVariable(value = "idChild") idChild: UUID,
               @RequestBody sumup: Sumup) = sumupRepository.save(sumup)
}