package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.enum.Role
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import reactor.test.StepVerifier

@ExtendWith(SpringExtension::class)
@DataMongoTest
class RoleRepositoryTest internal constructor(@Autowired
                                              private val repository: RoleRepository) {
    @Test
    fun findOne() {
        val role = repository.findById(1L)

        StepVerifier.create(role)
                .assertNext { r ->
                    run {

                        assertThat(1L).isEqualTo(r.id)
                        assertThat(Role.EDUCATOR.name).isEqualTo(r.name)
                        assertThat("Daycare educator").isEqualTo(r.description)
                    }
                }
                .expectComplete()
                .verify()
    }
}