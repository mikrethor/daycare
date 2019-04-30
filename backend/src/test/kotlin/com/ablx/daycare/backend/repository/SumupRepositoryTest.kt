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
                                               private val sumupRepository: SumupRepository) {
    @Test
    fun findOne() {

        StepVerifier.create(sumupRepository.findById(UUID.fromString("89033907-13b0-46b9-8f5d-67e6e7b1facd")))
                .assertNext { sumup ->
                    run {

                        Assertions.assertThat("comment 1 a").isEqualTo(sumup.comment)
                    }
                }
                .expectComplete()
                .verify()
    }

    @Test
    fun findAllByOrderByDayDesc() {

        StepVerifier.create(sumupRepository.findAllByChildIdOrderByDayDesc(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735aaa")))
                .expectNextCount(10)
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 1 a", sumup.comment)
                    }
                }
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 2", sumup.comment)
                    }
                }
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 2", sumup.comment)
                    }
                }
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 2", sumup.comment)
                    }
                }
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 2", sumup.comment)
                    }
                }
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 2", sumup.comment)
                    }
                }
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 2", sumup.comment)
                    }
                }
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 2", sumup.comment)
                    }
                }
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 2", sumup.comment)
                    }
                }
                .assertNext { sumup ->
                    run {
                        assertEquals("comment 2", sumup.comment)
                    }
                }
                .expectComplete()
                .verify()
    }
}