package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Child
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

internal interface ChildRepository : JpaRepository<Child, Long>{

    @Query("select c from Child c where c.daycare.id=:idDaycare")
    fun findAllByDaycare(@Param("idDaycare") id: Long): MutableList<Child>

    @Query("select c from Child c where c.id=:id and c.daycare.id=:idDaycare")
    fun findOneByIdByDaycare(@Param("id") id: Long,@Param("idDaycare") idDaycare: Long): Child
}