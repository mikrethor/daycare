package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.*

internal interface UserRepository : JpaRepository<User, UUID> {

    fun findByUsername(@Param("username") username: String): User

    @Query("select u from User u where u.daycare.id=:idDaycare ")
    fun findAllByDaycare(@Param("idDaycare") id: UUID): List<User>


    @Query("select u from User u, Role r where u.daycare.id=:idDaycare and r.id=:idRole and " +
            "r member of u.roles")
    fun findAllByDaycareAndRole(@Param("idDaycare") id: UUID, @Param("idRole") idRole: Long): List<User>

    @Query("select u from User u, Role r where u.daycare.id=:idDaycare and r.id=:idRole and " +
            "r member of u.roles and u.id=:id")
    fun findOneByIdByDaycareAndRole(@Param("id") id: UUID, @Param("idDaycare") idDaycare: UUID, @Param("idRole") idRole: Long): User

    @Query("select u from User u where u.daycare.id=:idDaycare and u.id=:id")
    fun findOneByIdByDaycare(@Param("id") id: UUID, @Param("idDaycare") idDaycare: UUID): User
}