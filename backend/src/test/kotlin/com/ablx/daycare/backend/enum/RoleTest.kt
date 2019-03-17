package com.ablx.daycare.backend.enum

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class RoleTest {

    @Test
    fun roleEducatorIntValue() {
        assertEquals(1, Role.EDUCATOR.value)
    }

    @Test
    fun roleAdminIntValue() {
        assertEquals(2, Role.ADMIN.value)
    }

    @Test
    fun roleParentIntValue() {
        assertEquals(3, Role.PARENT.value)
    }

}