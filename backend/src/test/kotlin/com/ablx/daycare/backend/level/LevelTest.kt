package com.ablx.daycare.backend.level

import com.ablx.daycare.backend.objects.Level
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class LevelTest{

    @Test
    fun levelOtherIntValue() {
        try {
            Level.fromCode(89)
        }catch (e:Error){
            assertEquals("Invalid level 89", e.message)
        }
    }

    @Test
    fun level0IntValueToBad() {
        assertEquals(Level.BAD, Level.fromCode(0))
    }

    @Test
    fun level5IntValueToMedium() {
        assertEquals(Level.MEDIUM, Level.fromCode(5))
    }

    @Test
    fun level10IntValueToGood() {
        assertEquals(Level.GOOD, Level.fromCode(10))
    }
}