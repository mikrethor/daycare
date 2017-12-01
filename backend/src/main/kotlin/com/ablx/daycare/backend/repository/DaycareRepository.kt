package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Daycare
import org.springframework.data.jpa.repository.JpaRepository

internal interface DaycareRepository : JpaRepository<Daycare, Long>