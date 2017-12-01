package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@RunWith(SpringJUnit4ClassRunner::class)
@DataJpaTest
class NeedRepositoryTest {

    @Autowired
    private lateinit var repository: NeedRepository

    @Test
    fun findOne() {
        val daycare=repository.findOne(1L)
        Assertions.assertThat("TEST")
                .isEqualTo(daycare.code)
    }
}