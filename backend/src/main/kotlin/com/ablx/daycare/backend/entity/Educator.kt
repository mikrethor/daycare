package com.ablx.daycare.backend.entity

import java.util.*
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

@Entity
internal data class Educator(
        @Id var id: UUID, //Primary Key
        var firstname: String = "",
        var lastname: String = "",
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "daycare")
        var daycare: Daycare
)
