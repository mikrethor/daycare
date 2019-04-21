package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Daycare
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import java.util.*

internal interface DaycareRepository : ReactiveCrudRepository<Daycare, UUID>