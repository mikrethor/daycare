package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.Assert
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@RunWith(SpringJUnit4ClassRunner::class)
@DataJpaTest
class SumupRepositoryTest {

    @Autowired
    private lateinit var sumupRepository: SumupRepository

    @Autowired
    private lateinit var childRepository: ChildRepository


    @Test
    fun findOne() {
        val sumup = sumupRepository.findById(1L).get()
        Assertions.assertThat("comment 1 a")
                .isEqualTo(sumup.comment)
    }

    @Test
    fun findAllByOrderByDayDesc() {
        val child = childRepository.findById(1L).get()
        val sumups=sumupRepository.findAllByChildOrderByDayDesc(child)
        Assertions.assertThat(sumups.size)
                .isEqualTo(10)


        val sumup1=sumups.toTypedArray()[0]
        Assert.assertEquals("comment 1 a",sumup1.comment)

        val sumup10=sumups.toTypedArray()[9]
        Assert.assertEquals("comment 10",sumup10.comment)
    }
}