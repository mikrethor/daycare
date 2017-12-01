package com.ablx.daycare.backend.level

import com.ablx.daycare.backend.objects.Level
import org.junit.Assert
import org.junit.Test

class LevelTest{

    @Test
    fun levelOtherIntValue() {
        try {
            Level.fromCode(89)
        }catch (e:Error){
            Assert.assertEquals("Invalid level 89",e.message)
        }
    }

    @Test
    fun level0IntValueToBad() {
        Assert.assertEquals(Level.BAD,Level.fromCode(0))
    }

    @Test
    fun level5IntValueToMedium() {
        Assert.assertEquals(Level.MEDIUM,Level.fromCode(5))
    }

    @Test
    fun level10IntValueToGood() {
        Assert.assertEquals(Level.GOOD,Level.fromCode(10))
    }
}