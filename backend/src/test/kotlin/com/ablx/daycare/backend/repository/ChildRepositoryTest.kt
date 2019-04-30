package com.ablx.daycare.backend.repository

import com.ablx.daycare.backend.entity.Child
import org.assertj.core.api.Assertions
import org.assertj.core.api.BDDAssertions.then
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.test.context.junit.jupiter.SpringExtension
import reactor.test.StepVerifier
import java.util.*


@ExtendWith(SpringExtension::class)
@DataMongoTest
class ChildRepositoryTest internal constructor(@Autowired private val repository: ChildRepository,
                                               @Autowired
                                               private val mongoOperations: MongoOperations) {


    
    @BeforeEach
    fun beforeEach() {
        mongoOperations.dropCollection(Child::class.java)

        mongoOperations.save(Child(id = UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735aaa"), firstname = "Arthur",
                lastname = "B", daycareId = UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0")))

        mongoOperations.save(Child(id = UUID.fromString("7654fe79-5b38-4738-a899-6c49a2a69d3c"), firstname = "Louis",
                lastname = "B", daycareId = UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0")))
    }

    @Test
    fun findOne() {
        StepVerifier.create(repository.findById(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735aaa")))
                .assertNext { child ->
                    run {
                        Assertions.assertThat(child.id).isEqualTo(UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735aaa"))
                        Assertions.assertThat(child.firstname).isEqualTo("Arthur")
                        Assertions.assertThat(child.lastname).isEqualTo("B")
                        Assertions.assertThat(child.daycareId).isEqualTo(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))
                    }
                }
                .expectComplete()
                .verify()
    }


    @Test
    fun findAllByDaycare() {
        StepVerifier.create(repository.findAllByDaycare(UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0")))
                .recordWith { ArrayList<Child>() }
                .expectNextCount(2)
                .consumeRecordedWith { results ->
                    run {
                        then(results)
                                .containsSequence(listOf(Child(id = UUID.fromString("f13be1c0-9027-421f-8cf3-c3fdfa735aaa"), firstname = "Arthur",
                                        lastname = "B", daycareId = UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0")),

                                        Child(id = UUID.fromString("7654fe79-5b38-4738-a899-6c49a2a69d3c"), firstname = "Louis",
                                                lastname = "B", daycareId = UUID.fromString("2b958205-848b-4376-9c9d-5bfa39c70ee0"))))
                    }
                }
                .verifyComplete()
    }
}