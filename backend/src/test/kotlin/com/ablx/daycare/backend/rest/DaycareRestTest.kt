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
import java.util.*


@ExtendWith(SpringExtension::class)
//@WebMvcTest(controllers = [DaycareController::class], secure = false)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
class DaycareRestTest(@Autowired val webTestClient: WebTestClient) {

//    @Autowired
//    lateinit var ctx: WebApplicationContext

    @MockkBean
    internal lateinit var daycareRepository: DaycareRepository

    // private var mockMvc: MockMvc? = null

    private val contentType = MediaType("application", "json", Charsets.UTF_8)

//    @BeforeEach
//    fun setUp() {
//        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build()
//    }

    @WithMockUser(value = "spring")
    @Test
    fun getOneDaycare() {
        val id = UUID.randomUUID()
        val name = "Ma garderie"
        every {
            daycareRepository.getOne(id)
        } returns Daycare(id, name)

        this.webTestClient.mutateWith(csrf())
                .mutateWith(mockUser("spring"))
                .get().uri("/api/v1/daycares/$id")
                ?.exchange()
                ?.expectStatus()
                ?.isOk?.expectBody()
                ?.jsonPath("$.id")?.isEqualTo(id.toString())
                ?.jsonPath("$.name")?.isEqualTo(name)
    }

//    @Test
//    fun getAllDaycares() {
//        val id = UUID.randomUUID()
//        val name = "Ma garderie"
//        every { daycareRepository.findAll() } returns listOf(Daycare(id, name))
//
//        mockMvc!!.perform(get("/api/v1/daycares"))
//                .andExpect(status().isOk)
//                .andExpect(content().contentType(contentType))
//                .andExpect(jsonPath("$", hasSize<Any>(1)))
//                .andExpect(jsonPath("$[0].name", equalTo(name)))
//                .andExpect(jsonPath("$[0].id", equalTo(id.toString())))
//    }
}