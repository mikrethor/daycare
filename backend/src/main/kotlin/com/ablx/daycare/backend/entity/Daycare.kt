package com.ablx.daycare.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore

import javax.persistence.*

@Entity
internal data class Daycare(
        @field: Id @field: GeneratedValue var Id : Long = 0, //Primary Key
        var name : String = "", //Column
        @get:JsonIgnore
        @OneToMany(mappedBy = "daycare", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.LAZY)
        var educators: List<Educator> = emptyList(),
        @get:JsonIgnore
        @OneToMany(mappedBy = "daycare", cascade = arrayOf(CascadeType.ALL), fetch = FetchType.LAZY)
        var children: List<Child> = emptyList()
){

    override fun toString(): String {
        return "Daycare(Id=$Id, name='$name')"
    }


}