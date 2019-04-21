package com.ablx.daycare.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.util.*

@Document
internal data class User(
        @Id
        var id: UUID = UUID.randomUUID(),

        var username: String = "",

        @JsonIgnore
        var password: String = "",

        @Field("first_name")
        var firstName: String = "",

        @Field("last_name")
        var lastName: String = "",
        /**
         * Roles are being eagerly loaded here because
         * they are a fairly small collection of items for this example.
         */
        @Field("roles_ids")
        @DBRef
        var roles: List<Role> = emptyList(),

        @Field("daycare_id")
        var daycareId: UUID

)