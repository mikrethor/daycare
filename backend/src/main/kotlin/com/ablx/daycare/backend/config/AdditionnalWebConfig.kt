package com.ablx.daycare.backend.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@CrossOrigin(origins = arrayOf("*"))
@Configuration
class AdditionnalWebConfig {
    /**
     * Allowing all origins, headers and methods here is only intended to keep this example simple.
     * This is not a default recommended configuration. Make adjustments as
     * necessary to your use case.
     *
     */
    @Bean
    fun corsFilter(): CorsFilter {
        val source = UrlBasedCorsConfigurationSource()
        val config = CorsConfiguration()
        config.allowCredentials = true
        config.addAllowedOrigin("*")
        config.addAllowedHeader("*")
        config.addAllowedMethod("*")
        config.allowedOrigins= listOf("*")
        source.registerCorsConfiguration("/**", config)
        val bean = CorsFilter(source)
        //FilterRegistrationBean
        //bean.order = 0
        return bean
    }
}