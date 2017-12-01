package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@RunWith(SpringJUnit4ClassRunner::class)
@DataJpaTest
class ParentRepositoryTest {

    @Autowired
    private lateinit var repository: ParentRepository

    @Test
    fun findOne() {
        val parent= repository.findOne(2L)
        Assertions.assertThat("Bérengère")
                .isEqualTo(parent.firstname)
        Assertions.assertThat("B")
                .isEqualTo(parent.lastname)
        Assertions.assertThat(1L)
                .isEqualTo(parent.daycare.Id)
    }
}