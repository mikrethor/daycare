package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Educator
import org.springframework.data.jpa.repository.JpaRepository

internal interface EducatorRepository : JpaRepository<Educator, Long>