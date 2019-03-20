package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.*

@ExtendWith(SpringExtension::class)
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Test
    fun findOne() {
        val user = userRepository.getOne(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735a2a"))
        Assertions.assertThat(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
                .isEqualTo(user.daycare.id)
    }

    @Test
    fun findByDaycareId() {
        val users = userRepository.findAllByDaycare(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
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
        var users = userRepository.findAllByDaycareAndRole(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"), 3L)
        assertNotNull(users)
        assertEquals(1, users.size)

        val parent=users.toTypedArray()[0]
        assertEquals("parent@daycare.com", parent.username)

        users = userRepository.findAllByDaycareAndRole(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"), 1L)
        assertNotNull(users)
        assertEquals(2, users.size)


        val educator1=users.toTypedArray()[0]
        assertEquals("johndoe@daycare.com", educator1.username)

        val educator2=users.toTypedArray()[1]
        assertEquals("admin@daycare.com", educator2.username)

    }

    @Test
    fun findByUsername() {
        val user = userRepository.findByUsername("parent@daycare.com")
        assertNotNull(user)
        assertEquals(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735a4a"), user.id)
        assertEquals("Par", user.firstName)
        assertEquals("Ent", user.lastName)
    }

    @Test
    fun findOneByIdByDaycare() {
        val id = UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735a4a")
        val user = userRepository.findOneByIdByDaycare(id, UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
        assertNotNull(user)
        assertEquals(id, user.id)
        assertEquals("Par", user.firstName)
        assertEquals("Ent", user.lastName)
    }
}