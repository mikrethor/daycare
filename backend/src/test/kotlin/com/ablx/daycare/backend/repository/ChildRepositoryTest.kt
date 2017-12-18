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
class ChildRepositoryTest {

    @Autowired
    private lateinit var repository: ChildRepository

    @Test
    fun findOne() {
        val child= repository.findOne(1L)
        Assertions.assertThat(child.firstname)
                .isEqualTo("Arthur")
        Assertions.assertThat(child.lastname)
                .isEqualTo("B")
        Assertions.assertThat(child.daycare.Id)
                .isEqualTo(1L)
    }

    @Test
    fun findAllByDaycare() {
        val childs= repository.findAllByDaycare(1L)
        Assertions.assertThat(childs.size)
                .isEqualTo(2)

        val child1=childs.toTypedArray()[0]
        Assert.assertEquals("Arthur",child1.firstname)
        Assert.assertEquals("B",child1.lastname)

        val child2=childs.toTypedArray()[1]
        Assert.assertEquals("Louis",child2.firstname)
        Assert.assertEquals("B",child2.lastname)
    }
}