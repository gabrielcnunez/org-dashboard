package com.cooksys.groupfinal.security;

import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

//@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
@EnableWebSecurity
public class AppWebSecurity {

    private final AppAuthProvider appAuthProvider;

    public AppWebSecurity(AppAuthProvider appAuthProvider) {
        this.appAuthProvider = appAuthProvider;
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity httpSec) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = httpSec.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(appAuthProvider);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSec) throws Exception {
        httpSec.httpBasic()
            .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.GET, "/users").authenticated() // Require authentication to view all users
            .anyRequest().permitAll(); // Do not require authentication for other endpoints
        return httpSec.build();
    }
}