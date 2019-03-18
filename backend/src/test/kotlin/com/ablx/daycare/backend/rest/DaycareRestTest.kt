package com.ablx.daycare.backend.rest

import com.ablx.daycare.backend.controller.DaycareController
import com.ablx.daycare.backend.entity.Daycare
import com.ablx.daycare.backend.repository.DaycareRepository
import org.hamcrest.Matchers.equalTo
import org.hamcrest.Matchers.hasSize
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.ArgumentMatchers.any
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@ExtendWith(SpringExtension::class)
@WebMvcTest(controllers = [DaycareController::class], secure = false)
class DaycareRestTest{
    @Autowired
    lateinit var ctx: WebApplicationContext

    @MockBean
    internal lateinit var daycareRepository: DaycareRepository

    private var mockMvc: MockMvc? = null

    private val contentType = MediaType("application", "json", Charsets.UTF_8)

    private val contentTypeHal = MediaType("application", "hal+json", Charsets.UTF_8)

    // @Autowired
    //lateinit var testRestTemplate: TestRestTemplate

    @BeforeEach
    fun setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx).build()
    }

    @Test
    fun getOneDaycare() {
        val id = 1L
        val name = "Ma garderie"
        given(daycareRepository.getOne(any(Long::class.java))).willReturn(Daycare(id, name))
        mockMvc!!.perform(get("/daycares/1")).andExpect(status().isOk)
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value(name))
                .andReturn()
    }

    @Test
    fun getAllDaycares() {
        val id = 1L
        val name = "Ma garderie"
        given(daycareRepository.findAll()).willReturn(listOf<Daycare>(Daycare(id, name)))

        mockMvc!!.perform(get("/daycares"))
                .andExpect(status().isOk)
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$", hasSize<Any>(1)))
                .andExpect(jsonPath("$[0].name", equalTo("Ma garderie")))
                .andExpect(jsonPath("$[0].id", equalTo(1)))
    }
}