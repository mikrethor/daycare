package com.ablx.daycare.backend.entity

import javax.persistence.*

@Entity
internal data class Child(
        @field: Id @field: GeneratedValue var Id: Long = 0, //Primary Key
        var firstname: String = "",
        var lastname: String = "",
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "daycare")
        var daycare: Daycare = Daycare()
)