package com.ablx.daycare.backend.entity

import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

@Entity
internal data class Educator(
        @field: Id @field: GeneratedValue var id : Long = 0, //Primary Key
        var firstname:String = "",
        var lastname:String = "",
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "daycare")
        var daycare: Daycare
)
