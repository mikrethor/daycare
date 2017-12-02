package com.ablx.daycare.backend.entity

import javax.persistence.*

@Entity
internal data class Role (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        var name: String = "",
        var description: String = ""
)