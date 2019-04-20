package com.ablx.daycare.backend.entity

import com.ablx.daycare.backend.objects.Level
import java.time.LocalDate
import java.util.*
import javax.persistence.*

@Entity
internal data class Sumup(
        //Primary Key
        @Id var id: UUID = UUID.randomUUID(),
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "ID_CHILD", referencedColumnName = "ID")
        var child: Child = Child(),
        var comment: String = "",
        @Temporal(TemporalType.DATE)
        var day: LocalDate = LocalDate.now(),
        @Enumerated(EnumType.STRING)
        var mood: Level = Level.BAD,
        @Enumerated(EnumType.STRING)
        var sleep: Level = Level.BAD,
        @Enumerated(EnumType.STRING)
        var appetite: Level = Level.BAD
)