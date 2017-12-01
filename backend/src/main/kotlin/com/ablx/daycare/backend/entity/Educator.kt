package com.ablx.daycare.backend.entity

import javax.persistence.*

@Entity
internal data class Educator(
        @field: Id @field: GeneratedValue var Id : Long = 0, //Primary Key
        var firstname:String = "",
        var lastname:String = "",
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "daycare")
        var daycare : Daycare=Daycare()
)
