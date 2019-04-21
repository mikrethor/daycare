package com.ablx.daycare.backend.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

@Document
internal data class Daycare(
        @Id
        @NotNull @NotEmpty val id: UUID = UUID.randomUUID(),
        @NotNull @NotEmpty val name: String = ""
) {

    override fun toString(): String {
        return "Daycare(Id=$id, name='$name')"
    }


}