package com.ablx.daycare.backend.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.util.*

@Document
internal data class Educator(
        //Primary Key
        @Id var id: UUID,
        var firstname: String = "",
        var lastname: String = "",
        @Field("daycare_id")
        var daycareId: UUID
)
