package com.ablx.daycare.backend.repository

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import reactor.test.StepVerifier
import java.util.*

@ExtendWith(SpringExtension::class)
@DataMongoTest
class ChildRepositoryTest internal constructor(@Autowired private val repository: ChildRepository) {

    @Test
    fun findOne() {
        val child = repository.findById(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735aaa"))
        StepVerifier.create(child)
                .assertNext { c ->
                    run {
                        assertEquals("Arthur", c.firstname)
                        assertEquals("B", c.lastname)
                        assertEquals("2b958205-848b-4376-9c9d-5bfa39c70ee0", c.daycareId)
                    }
                }
                .expectComplete()
                .verify()
    }

    @Test
    fun findAllByDaycare() {
        val childs = repository.findAllByDaycare(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))


        StepVerifier.create(childs)
                .expectNextCount(2)
                .assertNext { c ->
                    run {
                        assertEquals("Arthur", c.firstname)
                        assertEquals("B", c.lastname)
                        assertEquals("2b958205-848b-4376-9c9d-5bfa39c70ee0", c.daycareId)
                    }
                }
                .assertNext { c ->
                    run {
                        assertEquals("Louis", c.firstname)
                        assertEquals("B", c.lastname)
                        assertEquals("2b958205-848b-4376-9c9d-5bfa39c70ee0", c.daycareId)
                    }
                }

                .expectComplete()
                .verify()
    }
}