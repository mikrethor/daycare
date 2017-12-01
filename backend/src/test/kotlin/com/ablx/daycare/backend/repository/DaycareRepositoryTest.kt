package com.ablx.daycare.backend.repository


import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@RunWith(SpringJUnit4ClassRunner::class)
@DataJpaTest
class DaycareRepositoryTest{

    @Autowired
    private lateinit var daycareRepository:DaycareRepository

    @Test
    fun findOne() {
        val daycare=daycareRepository.findOne(1L)
        assertThat("Ma garderie")
                .isEqualTo(daycare.name)
    }
}