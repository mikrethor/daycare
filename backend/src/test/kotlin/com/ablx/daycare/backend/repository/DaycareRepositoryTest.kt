package com.ablx.daycare.backend.repository


import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.*

@ExtendWith(SpringExtension::class)
@DataJpaTest
class DaycareRepositoryTest{

    @Autowired
    private lateinit var daycareRepository:DaycareRepository

    @Test
    fun findOne() {
        val daycare = daycareRepository.getOne(UUID.fromString("e3a842ac-5560-4256-9f5b-eaf6fa41712e"))
        assertThat("Ma garderie")
                .isEqualTo(daycare.name)
    }
}