package com.ablx.daycare.backend.service

import org.junit.Assert
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MyUserDetails{


    @Autowired
    private lateinit var myUserDetailsService: MyUserDetailsService

    @Test
    fun getUserDetailsByUsername() {
        var userDetails=myUserDetailsService.loadUserByUsername("john.doe")
        Assert.assertEquals("john.doe",userDetails.username)
        Assert.assertEquals(1,userDetails.authorities.size)
        Assert.assertEquals("EDUCATOR",userDetails.authorities.toTypedArray()[0].toString())


        userDetails=myUserDetailsService.loadUserByUsername("admin.admin")
        Assert.assertEquals("admin.admin",userDetails.username)
        Assert.assertEquals(2,userDetails.authorities.size)
        Assert.assertEquals("ADMIN",userDetails.authorities.toTypedArray()[0].toString())
        Assert.assertEquals("EDUCATOR",userDetails.authorities.toTypedArray()[1].toString())


        userDetails=myUserDetailsService.loadUserByUsername("parent")
        Assert.assertEquals("parent",userDetails.username)
        Assert.assertEquals(1,userDetails.authorities.size)
        Assert.assertEquals("PARENT",userDetails.authorities.toTypedArray()[0].toString())



        try {
            myUserDetailsService.loadUserByUsername("gjgh")
            Assert.fail()
        }catch (e:NullPointerException){

        }
    }
}