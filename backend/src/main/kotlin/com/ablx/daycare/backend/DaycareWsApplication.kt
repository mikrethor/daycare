package com.ablx.daycare.backend

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class DaycareWsApplication

fun main(args: Array<String>) {
    SpringApplication.run(DaycareWsApplication::class.java, *args)
}
