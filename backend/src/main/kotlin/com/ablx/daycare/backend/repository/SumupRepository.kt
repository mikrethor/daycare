package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Sumup
import org.springframework.data.jpa.repository.JpaRepository

internal interface SumupRepository : JpaRepository<Sumup, Long>