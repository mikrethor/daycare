package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Need
import org.springframework.data.jpa.repository.JpaRepository

internal interface NeedRepository : JpaRepository<Need, Long>