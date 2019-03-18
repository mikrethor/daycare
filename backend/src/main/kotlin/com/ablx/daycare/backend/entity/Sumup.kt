package com.ablx.daycare.backend.entity

import com.ablx.daycare.backend.objects.Level
import java.util.*
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Temporal
import javax.persistence.TemporalType

@Entity
internal data class Sumup(
        @field: Id @field: GeneratedValue var id : Long = 0, //Primary Key
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "ID_CHILD", referencedColumnName = "ID")
        var child: Child,
        var comment:String="",
        @Temporal(TemporalType.DATE)
        var day:Calendar=GregorianCalendar(),
        @Enumerated(EnumType.STRING)
        var mood: Level = Level.BAD,
        @Enumerated(EnumType.STRING)
        var sleep: Level = Level.BAD,
        @Enumerated(EnumType.STRING)
        var appetite: Level = Level.BAD
)