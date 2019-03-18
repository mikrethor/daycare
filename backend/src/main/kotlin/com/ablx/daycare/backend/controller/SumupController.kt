package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.Child
import com.ablx.daycare.backend.entity.Daycare
import com.ablx.daycare.backend.entity.Sumup
import com.ablx.daycare.backend.objects.Level
import com.ablx.daycare.backend.repository.ChildRepository
import com.ablx.daycare.backend.repository.SumupRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*


@RestController
internal class SumupController {

    @Autowired
    lateinit var sumupRepository: SumupRepository

    @Autowired
    lateinit var childRepository: ChildRepository

    @GetMapping("/daycares/{idDaycare}/childs/{idChild}/sumups/day/{day}")
    fun findOne(@PathVariable(value = "idDaycare") idDaycare: UUID,
                @PathVariable(value = "idChild") idChild: UUID,
                @DateTimeFormat(pattern = "yyyy-MM-dd")
                @PathVariable(value = "day") day: Calendar): Sumup {

        //TODO refactoring deport creation in front
        try {
            return sumupRepository.findOneByChildAndDay(idChild, day)
        } catch (e: Exception) {
            System.err.println(e)
            var sumup = Sumup(id = UUID.randomUUID(), child = Child(id = UUID.randomUUID(), daycare = Daycare(id = UUID.randomUUID())))
            sumup.child = childRepository.getOne(idChild)
            sumup.day = GregorianCalendar()
            sumup.mood = Level.BAD
            sumup.appetite = Level.BAD
            sumup.sleep = Level.BAD
            return sumup
        }
    }

    @GetMapping("/daycares/{idDaycare}/childs/{idChild}/sumups")
    fun findAll(@PathVariable(value = "idDaycare") idDaycare: UUID,
                @PathVariable(value = "idChild") idChild: UUID) =
            sumupRepository.findAllByChildOrderByDayDesc(childRepository.getOne(idChild))

    @PostMapping("/daycares/{idDaycare}/childs/{idChild}/sumups")
    fun create(@PathVariable(value = "idDaycare") idDaycare: UUID,
               @PathVariable(value = "idChild") idChild: UUID,
               @RequestBody sumup: Sumup): Sumup {
        return sumupRepository.save(sumup)
    }
}