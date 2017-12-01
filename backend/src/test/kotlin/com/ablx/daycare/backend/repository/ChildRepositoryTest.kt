package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@RunWith(SpringJUnit4ClassRunner::class)
@DataJpaTest
class ChildRepositoryTest {

    @Autowired
    private lateinit var repository: ChildRepository

    @Test
    fun findOne() {
        val child= repository.findOne(1L)
        Assertions.assertThat("Arthur")
                .isEqualTo(child.firstname)
        Assertions.assertThat("B")
                .isEqualTo(child.lastname)
        Assertions.assertThat(1L)
                .isEqualTo(child.daycare.Id)
    }
}