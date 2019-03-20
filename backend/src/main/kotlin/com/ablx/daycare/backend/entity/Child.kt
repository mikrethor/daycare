package com.ablx.daycare.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.*
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "child", schema = "daycare")
internal data class Child(
        @Id var id: UUID = UUID.randomUUID(), //Primary Key
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