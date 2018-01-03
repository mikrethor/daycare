package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Role
import com.ablx.daycare.backend.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

internal interface RoleRepository : JpaRepository<Role, Long>