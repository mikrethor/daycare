package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Child
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.*

internal interface ChildRepository : JpaRepository<Child, UUID> {

    @Query("select c from Child c where c.daycare.id=:idDaycare")
    fun findAllByDaycare(@Param("idDaycare") id: UUID): MutableList<Child>

    @Query("select c from Child c where c.id=:id and c.daycare.id=:idDaycare")
    fun findOneByIdByDaycare(@Param("id") id: UUID, @Param("idDaycare") idDaycare: UUID): Child
}