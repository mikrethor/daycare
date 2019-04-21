package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.User
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

internal interface UserRepository : ReactiveCrudRepository<User, UUID> {

    fun findByUsername(@Param("username") username: String): Mono<User>

    @Query("{'daycare_id' : ?0 }")
    fun findAllByDaycare(@Param("idDaycare") id: UUID): Flux<User>


//    @Query("select u from User u, Role r where u.daycare.id=:idDaycare and r.id=:idRole and " +
//            "r member of u.roles")
//    fun findAllByDaycareAndRole(@Param("idDaycare") id: UUID, @Param("idRole") idRole: Long): Flux<User>
//
//    @Query("select u from User u, Role r where u.daycare.id=:idDaycare and r.id=:idRole and " +
//            "r member of u.roles and u.id=:id")
//    fun findOneByIdByDaycareAndRole(@Param("id") id: UUID, @Param("idDaycare") idDaycare: UUID, @Param("idRole") idRole: Long): Mono<User>

    @Query("{'id' : ?0, 'daycare_id' : ?1 }")
    fun findOneByIdByDaycare(@Param("id") id: UUID, @Param("idDaycare") idDaycare: UUID): Mono<User>
}