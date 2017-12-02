package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository

internal interface UserRepository : JpaRepository<User, Long>{
    fun findByUsername(username: String): User?
}