package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Role
import org.springframework.data.jpa.repository.JpaRepository

internal interface RoleRepository : JpaRepository<Role, Long>