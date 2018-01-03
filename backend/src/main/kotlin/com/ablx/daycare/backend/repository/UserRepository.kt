package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

internal interface UserRepository : JpaRepository<User, Long>{

    fun findByUsername(@Param("username") username: String): User

    @Query("select u from User u where u.daycare.id=:idDaycare ")
    fun findAllByDaycare(@Param("idDaycare") id: Long): List<User>


    @Query("select u from User u, Role r where u.daycare.id=:idDaycare and r.id=:idRole and " +
            "r member of u.roles")
    fun findAllByDaycareAndRole(@Param("idDaycare") id: Long, @Param("idRole") idRole: Long): List<User>

    @Query("select u from User u, Role r where u.daycare.id=:idDaycare and r.id=:idRole and " +
            "r member of u.roles and u.id=:id")
    fun findOneByIdByDaycareAndRole(@Param("id") id: Long,@Param("idDaycare") idDaycare: Long, @Param("idRole") idRole: Long): User

    @Query("select u from User u where u.daycare.id=:idDaycare and u.id=:id")
    fun findOneByIdByDaycare(@Param("id") id: Long,@Param("idDaycare") idDaycare: Long): User
}