package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.entity.Sumup
import com.ablx.daycare.backend.objects.Level
import com.ablx.daycare.backend.repository.ChildRepository
import com.ablx.daycare.backend.repository.SumupRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.*
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
                @DateTimeFormat(pattern = "yyyy-MM-dd")
                @PathVariable(value="day")day: Calendar):Sumup {

        //TODO refactoring deport creation in front
        try{
            return sumupRepository.findOneByChildAndDay(idChild, day)
        }
        catch (e:Exception){
            System.err.println(e)
            var sumup=Sumup()
            sumup.child=childRepository.findOne(idChild)
            sumup.day=GregorianCalendar()
            sumup.mood= Level.BAD
            sumup.appetite= Level.BAD
            sumup.sleep= Level.BAD
            return sumup
        }}

    @GetMapping("/daycares/{idDaycare}/childs/{idChild}/sumups")
    fun findAll(@PathVariable(value="idDaycare")idDaycare: Long,
                @PathVariable(value="idChild")idChild: Long) =
            sumupRepository.findAllByChildOrderByDayDesc(childRepository.findOne(idChild))

    @PostMapping("/daycares/{idDaycare}/childs/{idChild}/sumups")
    fun create(@PathVariable(value="idDaycare")idDaycare:Long,
               @PathVariable(value="idChild")idChild:Long,
               @RequestBody sumup: Sumup) : Sumup {
        return sumupRepository.save(sumup)
    }
}