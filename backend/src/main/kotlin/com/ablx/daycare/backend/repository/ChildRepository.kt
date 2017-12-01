package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Child
import org.springframework.data.jpa.repository.JpaRepository

internal interface ChildRepository : JpaRepository<Child, Long>