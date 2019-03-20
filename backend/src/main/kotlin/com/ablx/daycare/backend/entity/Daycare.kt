package com.ablx.daycare.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.*
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Table
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

@Entity
@Table(name = "daycare", schema = "daycare")
internal data class Daycare(
        @Id
        @NotNull @NotEmpty val id: UUID = UUID.randomUUID(),
        @NotNull @NotEmpty val name: String = "",
        @get:JsonIgnore
        @OneToMany(mappedBy = "daycare", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        var educators: List<Educator> = emptyList(),
        @get:JsonIgnore
        @OneToMany(mappedBy = "daycare", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        var children: List<Child> = emptyList()
) {

    override fun toString(): String {
        return "Daycare(Id=$id, name='$name')"
    }


}