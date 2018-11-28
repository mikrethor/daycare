package com.ablx.daycare.backend

import org.junit.Test
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

class PasswordEncoderTest {

    @Test
    fun roleEducatorIntValue() {
        var encoded = BCryptPasswordEncoder().encode("admin")
        System.out.println(encoded)
    }
}