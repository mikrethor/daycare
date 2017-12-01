package com.ablx.daycare.backend.rest

import com.ablx.daycare.backend.entity.Daycare
import org.hamcrest.Matchers.equalTo
import org.hamcrest.Matchers.hasSize
import org.junit.Assert
import org.junit.Before
import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DaycareRestTest{
    @Autowired
    lateinit var ctx: WebApplicationContext

    private var mockMvc: MockMvc? = null

    private val contentType = MediaType("application", "json", Charsets.UTF_8)

    private val contentTypeHal = MediaType("application", "hal+json", Charsets.UTF_8)

    @Autowired
    lateinit var testRestTemplate: TestRestTemplate

    @Before
    fun setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx!!).build()
    }

    @Ignore
    @Test
    fun getOneDaycare() {
        val result = testRestTemplate.getForEntity("/daycares/1", Daycare::class.java)
        Assert.assertNotNull(result)
        Assert.assertEquals( HttpStatus.OK,result.statusCode)
        Assert.assertEquals( contentType,result.headers.contentType)
        Assert.assertEquals( Daycare(1L,"Ma garderie"),result.body)
    }

    @Test
    fun getAllDaycares() {
        mockMvc!!.perform(get("/daycares"))
                .andExpect(status().isOk)
                .andExpect(content().contentType(contentTypeHal))
                .andExpect(jsonPath("$._embedded.daycares", hasSize<Any>(1)))
                .andExpect(jsonPath("$._embedded.daycares[0].name", equalTo("Ma garderie")))
                .andExpect(jsonPath("$._embedded.daycares[0].id", equalTo(1)))
    }
}