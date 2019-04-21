package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
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
class SumupRepositoryTest internal constructor(@Autowired
                                               val sumupRepository: SumupRepository,
                                               @Autowired
                                               val childRepository: ChildRepository) {
    @Test
    fun findOne() {
        val sumup = sumupRepository.findById(UUID.fromString("89033907-13b0-46b9-8f5d-67e6e7b1facd"))


        StepVerifier.create(sumup)
                .assertNext { s ->
                    run {

                        Assertions.assertThat("comment 1 a").isEqualTo(s.comment)
                    }
                }
                .expectComplete()
                .verify()
    }

    @Test
    fun findAllByOrderByDayDesc() {
        val sumups = sumupRepository.findAllByChildIdOrderByDayDesc(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735aaa"))


        StepVerifier.create(sumups)
                .expectNextCount(10)
                .assertNext { s ->
                    run {
                        assertEquals("comment 1 a", s.comment)
                    }
                }
                .assertNext { s ->
                    run {
                        assertEquals("comment 2", s.comment)
                    }
                }
                .assertNext { s ->
                    run {
                        assertEquals("comment 2", s.comment)
                    }
                }
                .assertNext { s ->
                    run {
                        assertEquals("comment 2", s.comment)
                    }
                }
                .assertNext { s ->
                    run {
                        assertEquals("comment 2", s.comment)
                    }
                }
                .assertNext { s ->
                    run {
                        assertEquals("comment 2", s.comment)
                    }
                }
                .assertNext { s ->
                    run {
                        assertEquals("comment 2", s.comment)
                    }
                }
                .assertNext { s ->
                    run {
                        assertEquals("comment 2", s.comment)
                    }
                }
                .assertNext { s ->
                    run {
                        assertEquals("comment 2", s.comment)
                    }
                }
                .assertNext { s ->
                    run {
                        assertEquals("comment 2", s.comment)
                    }
                }
                .expectComplete()
                .verify()
    }
}