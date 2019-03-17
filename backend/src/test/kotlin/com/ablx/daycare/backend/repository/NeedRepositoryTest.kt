package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@DataJpaTest
class NeedRepositoryTest {

    @Autowired
    private lateinit var repository: NeedRepository

    @Test
    fun findOne() {
        val need = repository.getOne(1L)
        Assertions.assertThat("TEST")
                .isEqualTo(need.code)
    }
}