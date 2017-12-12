package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

internal interface UserRepository : JpaRepository<User, Long>{

    fun findByUsername(@Param("username") username: String): User

    @Query("select u from User u where u.daycare.id=:idDaycare ")
    fun findAllByDaycare(@Param("idDaycare") id: Long): List<User>
}