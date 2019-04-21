package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Sumup
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import java.util.*

internal interface SumupRepository : ReactiveCrudRepository<Sumup, UUID> {

    fun findAllByChildIdOrderByDayDesc(child_id: UUID): Flux<Sumup>

    @Query("{'day' : ?1, 'child_id' : ?0 }")
    fun findOneByChildAndDay(@Param("idChild") idChild: UUID, @Param("day") day: Calendar): Sumup
}