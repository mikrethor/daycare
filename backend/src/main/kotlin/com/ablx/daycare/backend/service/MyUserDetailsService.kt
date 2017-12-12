package com.ablx.daycare.backend.service

import com.ablx.daycare.backend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Component
import java.util.*

@Component
class MyUserDetailsService : UserDetailsService {
    @Autowired
    private lateinit var  userRepository: UserRepository

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)

        val authorities = ArrayList<GrantedAuthority>()
        user.roles.forEach { role -> authorities.add(SimpleGrantedAuthority(role.name)) }

        return org.springframework.security.core.userdetails.User(user.username, user.password, authorities)
    }
}