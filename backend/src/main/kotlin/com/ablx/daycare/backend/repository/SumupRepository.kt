package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Child
import com.ablx.daycare.backend.entity.Sumup
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.*

internal interface SumupRepository : JpaRepository<Sumup, Long> {

    fun findAllByChildOrderByDayDesc(child:Child): List<Sumup>

    @Query("select s from Sumup s where s.day=:day and s.child.id=:idChild")
    fun findOneByChildAndDay(@Param("idChild")idChild:Long,@Param("day") day: Calendar):Sumup
}