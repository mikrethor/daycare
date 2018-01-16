package com.ablx.daycare.backend.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController


@RestController
internal class LoggerController {



    @PostMapping("/api/logs")
    fun create( @RequestBody user: String) :Boolean {
        System.out.println(user)

        return true;
    }

}