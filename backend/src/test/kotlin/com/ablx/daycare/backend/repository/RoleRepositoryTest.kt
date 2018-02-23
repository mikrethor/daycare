package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.enum.Role
import org.assertj.core.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@RunWith(SpringJUnit4ClassRunner::class)
@DataJpaTest
class RoleRepositoryTest {

    @Autowired
    private lateinit var repository: RoleRepository

    @Test
    fun findOne() {
        val role = repository.findOne(1L)
        Assertions.assertThat(1L).isEqualTo(role.id)
        Assertions.assertThat(Role.EDUCATOR.name).isEqualTo(role.name)
        Assertions.assertThat("Daycare educator").isEqualTo(role.description)
    }
}