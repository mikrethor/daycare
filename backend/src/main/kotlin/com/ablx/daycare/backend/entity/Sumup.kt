package com.ablx.daycare.backend.entity

import com.ablx.daycare.backend.objects.Level
import java.util.*
import javax.persistence.*

@Entity
internal data class Sumup(
        @field: Id @field: GeneratedValue var Id : Long = 0, //Primary Key
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "ID_CHILD", referencedColumnName = "ID")
        var child:Child=Child(),
        var comment:String="",
        var day:Calendar=GregorianCalendar(),
        @Enumerated(EnumType.STRING)
        var mood:Level=Level.BAD,
        @Enumerated(EnumType.STRING)
        var sleep:Level=Level.BAD,
        @Enumerated(EnumType.STRING)
        var appetite:Level=Level.BAD
)