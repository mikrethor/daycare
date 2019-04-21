package com.ablx.daycare.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.util.*

@Document
internal data class Child(
        //Primary Key
        @Id var id: UUID = UUID.randomUUID(),
        var firstname: String = "",
        var lastname: String = "",
        @Field("daycare_id")
        var daycareId: UUID,
        @get:JsonIgnore
        @DBRef
        var sumups: List<Sumup> = emptyList()
) {
    override fun toString(): String {
        return "Child(id=$id, firstname='$firstname', lastname='$lastname')"
    }
}