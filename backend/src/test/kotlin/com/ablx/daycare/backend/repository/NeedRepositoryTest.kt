package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.*

@ExtendWith(SpringExtension::class)
@DataJpaTest
class NeedRepositoryTest {

    @Autowired
    private lateinit var repository: NeedRepository

    @Test
    fun findOne() {
        val need = repository.getOne(UUID.fromString("6ad2ef8b-f5d0-40e4-80ab-e6c0888c46cd"))
        Assertions.assertThat("TEST")
                .isEqualTo(need.code)
    }
}