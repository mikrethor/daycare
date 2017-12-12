package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.Assert
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@RunWith(SpringJUnit4ClassRunner::class)
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Test
    fun findOne() {
        val user=userRepository.findOne(1L)
        Assertions.assertThat(1L)
                .isEqualTo(user.daycare.Id)
    }

    @Test
    fun findByDaycareId() {
        val users=userRepository.findAllByDaycare(1L)
        Assert.assertNotNull(users)
        Assert.assertEquals(3,users.size)

        val educator=users.toTypedArray()[0]
        Assert.assertEquals("johndoe",educator.username)

        val admin=users.toTypedArray()[1]
        Assert.assertEquals("admin",admin.username)

        val parent=users.toTypedArray()[2]
        Assert.assertEquals("parent",parent.username)
    }
}