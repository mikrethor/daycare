package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Role
import org.springframework.data.repository.reactive.ReactiveCrudRepository

internal interface RoleRepository : ReactiveCrudRepository<Role, Long>