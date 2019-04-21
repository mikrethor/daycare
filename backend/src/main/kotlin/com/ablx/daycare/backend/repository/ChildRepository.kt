package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Child
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import java.util.*

internal interface ChildRepository : ReactiveCrudRepository<Child, UUID> {

    @Query("{'daycare_id' : ?0 }")
    fun findAllByDaycare(@Param("idDaycare") id: UUID): Flux<Child>

    @Query("{'id' : ?0, 'daycare_id' : ?1 }")
    fun findOneByIdByDaycare(@Param("id") id: UUID, @Param("idDaycare") idDaycare: UUID): Flux<Child>
}