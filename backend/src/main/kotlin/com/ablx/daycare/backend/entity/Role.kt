package com.ablx.daycare.backend.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
internal data class Role (
        //https://www.baeldung.com/spring-boot-mongodb-auto-generated-field
        @Id
        var id: Long = 0,
        var name: String = "",
        var description: String = ""
)