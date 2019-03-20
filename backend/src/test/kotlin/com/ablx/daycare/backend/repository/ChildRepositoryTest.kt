package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.*

@ExtendWith(SpringExtension::class)
@DataJpaTest
class ChildRepositoryTest {

    @Autowired
    private lateinit var repository: ChildRepository

    @Test
    fun findOne() {
        val child = repository.getOne(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735aaa"))
        Assertions.assertThat(child.firstname)
                .isEqualTo("Arthur")
        Assertions.assertThat(child.lastname)
                .isEqualTo("B")
        Assertions.assertThat(child.daycare.id)
                .isEqualTo(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
    }

    @Test
    fun findAllByDaycare() {
        val childs = repository.findAllByDaycare(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
        Assertions.assertThat(childs.size)
                .isEqualTo(2)

        val child1=childs.toTypedArray()[0]
        assertEquals("Arthur", child1.firstname)
        assertEquals("B", child1.lastname)

        val child2=childs.toTypedArray()[1]
        assertEquals("Louis", child2.firstname)
        assertEquals("B", child2.lastname)
    }
}