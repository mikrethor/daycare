package com.ablx.daycare.backend.objects

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue

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
        @JsonCreator @JvmStatic
        fun forValue(value: Int)= when (value) {
            0 ->  BAD
            5 ->  MEDIUM
            10 ->  GOOD
            else -> BAD
        }
    }

    @JsonValue
    fun level(): Int {
        return level
    }
}