package com.ablx.daycare.backend.objects

import java.util.*

internal data class LogLevel(
        var level: String = "",
        var message: String="",
//        var additional: String,
        var timestamp: Calendar=GregorianCalendar()
)