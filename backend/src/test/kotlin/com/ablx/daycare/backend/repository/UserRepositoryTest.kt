package com.ablx.daycare.backend.repository

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import reactor.test.StepVerifier
import java.util.*

@ExtendWith(SpringExtension::class)
@DataMongoTest
class UserRepositoryTest internal constructor(@Autowired
                                              private val userRepository: UserRepository) {
   // https://www.baeldung.com/spring-boot-embedded-mongodb
    @Test
    fun findOne() {
        val user = userRepository.findById(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735a2a"))


        StepVerifier.create(user)
                .assertNext { u ->
                    run {
                        Assertions.assertThat(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
                                .isEqualTo(u.daycareId)
                    }
                }
                .expectComplete()
                .verify()

    }

    @Test
    fun findByDaycareId() {
        val users = userRepository.findAllByDaycare(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
        StepVerifier.create(users)
                .expectNextCount(4)
                .assertNext { u ->
                    run {
                        assertEquals("johndoe@daycare.com", u.username)
                    }
                }
                .assertNext { u ->
                    run {
                        assertEquals("admin@daycare.com", u.username)
                    }
                }
                .assertNext { u ->
                    run {
                        assertEquals("parent@daycare.com", u.username)
                    }
                }
                .expectComplete()
                .verify()
    }


//    @Test
//    fun findAllByDaycareAndRole() {
//        var users = userRepository.findAllByDaycareAndRole(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"), 3L)
//        assertNotNull(users)
//
//        StepVerifier.create(users)
//                .expectNextCount(1)
//                .assertNext { u ->
//                    run {
//                        assertEquals("parent@daycare.com", u.username)
//                    }
//                }
//                .expectComplete()
//                .verify()
//
//
//        users = userRepository.findAllByDaycareAndRole(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"), 1L)
//        assertNotNull(users)
//
//        StepVerifier.create(users)
//                .expectNextCount(2)
//                .assertNext { u ->
//                    run {
//                        assertEquals("johndoe@daycare.com", u.username)
//                    }
//                }
//                .assertNext { u ->
//                    run {
//                        assertEquals("admin@daycare.com", u.username)
//                    }
//                }
//                .expectComplete()
//                .verify()
//    }

    @Test
    fun findByUsername() {
        val user = userRepository.findByUsername("parent@daycare.com")
        StepVerifier.create(user)
                .assertNext { u ->
                    run {
                        assertNotNull(u)
                        assertEquals(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735a4a"), u.id)
                        assertEquals("Par", u.firstName)
                        assertEquals("Ent", u.lastName)
                    }
                }
                .expectComplete()
                .verify()
    }

    @Test
    fun findOneByIdByDaycare() {
        val id = UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735a4a")
        val user = userRepository.findOneByIdByDaycare(id, UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))

        StepVerifier.create(user)
                .assertNext { u ->
                    run {
                        assertNotNull(u)
                        assertEquals(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735a4a"), u.id)
                        assertEquals("Par", u.firstName)
                        assertEquals("Ent", u.lastName)
                    }
                }
                .expectComplete()
                .verify()
    }
}