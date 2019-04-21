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
class NeedRepositoryTest internal constructor(@Autowired
                                              private val repository: NeedRepository) {
    @Test
    fun findOne() {
        val need = repository.findById(UUID.fromString("6ad2ef8b-f5d0-40e4-80ab-e6c0888c46cd"))
        StepVerifier.create(need)
                .assertNext { n ->
                    run {
                        assertEquals("TEST", n.code)
                    }
                }
                .expectComplete()
                .verify()
    }
}