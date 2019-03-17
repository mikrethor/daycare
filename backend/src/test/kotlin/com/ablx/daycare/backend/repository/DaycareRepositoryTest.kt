package com.ablx.daycare.backend.repository


import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@DataJpaTest
class DaycareRepositoryTest{

    @Autowired
    private lateinit var daycareRepository:DaycareRepository

    @Test
    fun findOne() {
        val daycare=daycareRepository.getOne(1L)
        assertThat("Ma garderie")
                .isEqualTo(daycare.name)
    }
}