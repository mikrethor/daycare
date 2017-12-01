package com.ablx.daycare.backend.objects

enum class Level(val level: Int ) {
    GOOD(10),
    MEDIUM(5),
    BAD(0);

    companion object {
        fun fromCode(level: Int) =
                when (level) {
                    0 ->  BAD
                    5 ->  MEDIUM
                    10 ->  GOOD
                    else ->
                        Error("Invalid level $level")
                }
    }
}