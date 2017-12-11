package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param

internal interface UserRepository : JpaRepository<User, Long>{

    fun findByUsername(@Param("username") username: String): User
}