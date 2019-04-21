package com.ablx.daycare.backend.repository


import com.ablx.daycare.backend.entity.Daycare
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import reactor.test.StepVerifier
import java.util.*

@ExtendWith(SpringExtension::class)
@DataMongoTest
class DaycareRepositoryTest internal constructor(@Autowired
                                                 private val daycareRepository: DaycareRepository) {

    @BeforeEach
    fun setUp() {

        daycareRepository.save(Daycare(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"), "Ma garderie")).block()
    }

    @Test
    fun findOne() {
        val daycare = daycareRepository.findById(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
        StepVerifier.create(daycare)
                .assertNext { d ->
                    run {
                        Assertions.assertEquals("Ma garderie", d.name)
                        Assertions.assertEquals(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"), d.id)
                    }
                }
                .expectComplete()
                .verify()

    }
}