package com.ablx.daycare.backend.controller

import com.ablx.daycare.backend.objects.LogLevel
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController


@RestController
internal class LoggerController {

    @PostMapping("/api/logs")
    fun create( @RequestBody loglevel: LogLevel) :Boolean {
        System.out.println(loglevel)
        return true
    }

}