package com.ablx.daycare.backend.entity

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id

@Entity
internal data class Need(
        @Id var id: UUID = UUID.randomUUID(), //Primary Key
        var code: String = ""
//TODO find a way to have description multilingual
)