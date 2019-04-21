package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Need
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import java.util.*

internal interface NeedRepository : ReactiveCrudRepository<Need, UUID>