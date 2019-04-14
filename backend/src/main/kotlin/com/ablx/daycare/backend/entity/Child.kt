package com.ablx.daycare.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.*
import javax.persistence.*

@Entity
internal data class Child(
        //Primary Key
        @Id var id: UUID = UUID.randomUUID(),
        var firstname: String = "",
        var lastname: String = "",
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "daycare")
        var daycare: Daycare = Daycare(),
        @get:JsonIgnore
        @OneToMany(mappedBy = "child", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        var sumups: List<Sumup> = emptyList()
) {
    override fun toString(): String {
        return "Child(id=$id, firstname='$firstname', lastname='$lastname', daycare=$daycare)"
    }
}