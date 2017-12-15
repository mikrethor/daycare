package com.ablx.daycare.backend.enum

import org.junit.Assert
import org.junit.Test

class RoleTest {

    @Test
    fun roleEducatorIntValue() {
        Assert.assertEquals(1,Role.EDUCATOR.value)
    }

    @Test
    fun roleAdminIntValue() {
        Assert.assertEquals(2,Role.ADMIN.value)
    }

    @Test
    fun roleParentIntValue() {
        Assert.assertEquals(3,Role.PARENT.value)
    }

}