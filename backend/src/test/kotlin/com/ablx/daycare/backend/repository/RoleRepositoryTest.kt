package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.enum.Role
import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@DataJpaTest
class RoleRepositoryTest internal constructor(@Autowired
                                              private val repository: RoleRepository) {
    @Test
    fun findOne() {
        val role = repository.getOne(1L)
        Assertions.assertThat(1L).isEqualTo(role.id)
        Assertions.assertThat(Role.EDUCATOR.name).isEqualTo(role.name)
        Assertions.assertThat("Daycare educator").isEqualTo(role.description)
    }
}