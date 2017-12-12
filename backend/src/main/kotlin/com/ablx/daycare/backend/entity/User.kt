package com.ablx.daycare.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
internal data class User (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long= 0,

        var username: String = "",

        @JsonIgnore
        var password: String = "",

        @Column(name = "first_name")
        var firstName: String = "",

        @Column(name = "last_name")
        var lastName: String = "",
        /**
         * Roles are being eagerly loaded here because
         * they are a fairly small collection of items for this example.
         */
        @ManyToMany(fetch = FetchType.EAGER)
        @JoinTable(name = "user_role", joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")], inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")])
        var roles: List<Role> = emptyList(),

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "daycare")
        var daycare : Daycare=Daycare()

)