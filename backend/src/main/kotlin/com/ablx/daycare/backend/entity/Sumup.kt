package com.ablx.daycare.backend.entity

import com.ablx.daycare.backend.objects.Level
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.time.LocalDate
import java.util.*

@Document
internal data class Sumup(
        //Primary Key
        @Id
        var id: UUID = UUID.randomUUID(),
        @Field("child_id")
        var childId: UUID,
        var comment: String = "",
        var day: LocalDate = LocalDate.now(),
        var mood: Level = Level.BAD,
        var sleep: Level = Level.BAD,
        var appetite: Level = Level.BAD
)