package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Parent
import org.springframework.data.jpa.repository.JpaRepository

internal interface ParentRepository : JpaRepository<Parent, Long>