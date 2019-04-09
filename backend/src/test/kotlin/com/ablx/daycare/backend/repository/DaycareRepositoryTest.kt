package com.ablx.daycare.backend.repository


import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.*

@ExtendWith(SpringExtension::class)
@DataJpaTest
class DaycareRepositoryTest internal constructor(@Autowired
                                                 private val daycareRepository: DaycareRepository) {
    @Test
    fun findOne() {
        val daycare = daycareRepository.getOne(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
        assertThat("Ma garderie")
                .isEqualTo(daycare.name)
    }
}