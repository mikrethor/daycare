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


    @Test
    fun findAllByDaycareAndRole() {
        var users=userRepository.findAllByDaycareAndRole(1L,3L)
        Assert.assertNotNull(users)
        Assert.assertEquals(1,users.size)

        val parent=users.toTypedArray()[0]
        Assert.assertEquals("parent",parent.username)

        users=userRepository.findAllByDaycareAndRole(1L,1L)
        Assert.assertNotNull(users)
        Assert.assertEquals(2,users.size)


        val educator1=users.toTypedArray()[0]
        Assert.assertEquals("johndoe",educator1.username)

        val educator2=users.toTypedArray()[1]
        Assert.assertEquals("admin",educator2.username)

    }
}