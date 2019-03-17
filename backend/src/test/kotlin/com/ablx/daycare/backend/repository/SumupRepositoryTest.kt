package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@DataJpaTest
class SumupRepositoryTest {

    @Autowired
    private lateinit var sumupRepository: SumupRepository

    @Autowired
    private lateinit var childRepository: ChildRepository


    @Test
    fun findOne() {
        val sumup=sumupRepository.getOne(1L)
        Assertions.assertThat("comment 1 a")
                .isEqualTo(sumup.comment)
    }

    @Test
    fun findAllByOrderByDayDesc() {
        val child=childRepository.getOne(1L)
        val sumups=sumupRepository.findAllByChildOrderByDayDesc(child)
        Assertions.assertThat(sumups.size)
                .isEqualTo(10)


        val sumup1=sumups.toTypedArray()[0]
        assertEquals("comment 1 a", sumup1.comment)

        val sumup10=sumups.toTypedArray()[9]
        assertEquals("comment 10", sumup10.comment)
    }
}