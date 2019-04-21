package com.ablx.daycare.backend.rest

import com.ablx.daycare.backend.entity.Daycare
import com.ablx.daycare.backend.repository.DaycareRepository
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf
import org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.mockUser
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.expectBodyList
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*


@ExtendWith(SpringExtension::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
class DaycareRestTest(@Autowired val webTestClient: WebTestClient) {

    @MockkBean
    internal lateinit var daycareRepository: DaycareRepository

    private val contentType = MediaType("application", "json", Charsets.UTF_8)

    @WithMockUser(value = "spring")
    @Test
    fun getOneDaycare() {
        val id = UUID.randomUUID()
        val name = "Ma garderie"
        every {
            daycareRepository.findById(id)
        } returns Mono.just(Daycare(id, name))

        this.webTestClient.mutateWith(csrf())
                .mutateWith(mockUser("spring"))
                .get().uri("/api/v1/daycares/$id")
                .exchange()
                .expectHeader().contentType(contentType)
                .expectStatus().isOk
                .expectBody()
                .jsonPath("$.id").isEqualTo(id.toString())
                .jsonPath("$.name").isEqualTo(name)
    }

    @WithMockUser(value = "spring")
    @Test
    fun getAllDaycares() {
        val id = UUID.randomUUID()
        val name = "Ma garderie"
        every { daycareRepository.findAll() } returns Flux.just(Daycare(id, name))

        this.webTestClient.mutateWith(csrf())
                .mutateWith(mockUser("spring"))
                .get().uri("/api/v1/daycares")
                .exchange()
                .expectHeader()
                .contentType(contentType)
                .expectStatus().isOk
                .expectBodyList<Daycare>()
                .hasSize(1)
                .contains(Daycare(id, name))
    }
}