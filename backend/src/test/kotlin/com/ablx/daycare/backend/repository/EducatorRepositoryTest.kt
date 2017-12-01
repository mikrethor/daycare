package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@RunWith(SpringJUnit4ClassRunner::class)
@DataJpaTest
class EducatorRepositoryTest {

    @Autowired
    private lateinit var repository: EducatorRepository

    @Test
    fun findOne() {
        val educator= repository.findOne(2L)
        Assertions.assertThat("Bérengère")
                .isEqualTo(educator.firstname)
        Assertions.assertThat("CB")
                .isEqualTo(educator.lastname)
        Assertions.assertThat(1L)
                .isEqualTo(educator.daycare.Id)
    }
}