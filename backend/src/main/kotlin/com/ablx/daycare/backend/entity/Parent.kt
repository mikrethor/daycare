package com.ablx.daycare.backend.entity

import java.util.*
import javax.persistence.*

@Entity
internal data class Parent(
        //Primary Key
        @Id var id: UUID,
        var firstname:String = "",
        var lastname:String = "",
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "daycare")
        var daycare: Daycare
)