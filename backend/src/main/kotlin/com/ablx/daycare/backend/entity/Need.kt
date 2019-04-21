package com.ablx.daycare.backend.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document
internal data class Need(
        @Id var id: UUID = UUID.randomUUID(), //Primary Key
        var code: String = ""
//TODO find a way to have description multilingual
)