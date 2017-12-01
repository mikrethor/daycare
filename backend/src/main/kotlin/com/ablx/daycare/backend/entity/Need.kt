package com.ablx.daycare.backend.entity

import javax.persistence.*

@Entity
internal data class Need(
        @field: Id @field: GeneratedValue var Id: Long = 0, //Primary Key
        var code: String = ""
//TODO find a way to have description multilingual
)