package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Test
    fun findOne() {
        val user=userRepository.getOne(1L)
        Assertions.assertThat(1L)
                .isEqualTo(user.daycare.id)
    }

    @Test
    fun findByDaycareId() {
        val users=userRepository.findAllByDaycare(1L)
        assertNotNull(users)
        assertEquals(4, users.size)

        val educator=users.toTypedArray()[0]
        assertEquals("johndoe@daycare.com", educator.username)

        val admin=users.toTypedArray()[1]
        assertEquals("admin@daycare.com", admin.username)

        val parent=users.toTypedArray()[2]
        assertEquals("parent@daycare.com", parent.username)
    }


    @Test
    fun findAllByDaycareAndRole() {
        var users=userRepository.findAllByDaycareAndRole(1L,3L)
        assertNotNull(users)
        assertEquals(1, users.size)

        val parent=users.toTypedArray()[0]
        assertEquals("parent@daycare.com", parent.username)

        users=userRepository.findAllByDaycareAndRole(1L,1L)
        assertNotNull(users)
        assertEquals(2, users.size)


        val educator1=users.toTypedArray()[0]
        assertEquals("johndoe@daycare.com", educator1.username)

        val educator2=users.toTypedArray()[1]
        assertEquals("admin@daycare.com", educator2.username)

    }

    @Test
    fun findByUsername() {
        var user = userRepository.findByUsername("parent@daycare.com")
        assertNotNull(user)
        assertEquals(3L, user.id)
        assertEquals("Par", user.firstName)
        assertEquals("Ent", user.lastName)
    }

    @Test
    fun findOneByIdByDaycare() {
        var user = userRepository.findOneByIdByDaycare(3L, 1L)
        assertNotNull(user)
        assertEquals(3L, user.id)
        assertEquals("Par", user.firstName)
        assertEquals("Ent", user.lastName)
    }
}