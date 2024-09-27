package com.cooksys.groupfinal.security;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.services.UserService;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class AppAuthProvider implements AuthenticationProvider {

    private UserService userService;

    public AppAuthProvider(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException, BadRequestException {
        String username = authentication.getName();

        Object credential = authentication.getCredentials();

        if (!(credential instanceof String)) {
            throw new BadCredentialsException("Passwords must be a string");
        }

        String password = (String) authentication.getCredentials();

        CredentialsDto credentialsDto = new CredentialsDto();
        credentialsDto.setPassword(password);
        credentialsDto.setUsername(username);

        FullUserDto loginResult;

        try {
            loginResult = userService.loginAdmin(credentialsDto);
        } catch (Exception e) {
            throw new BadCredentialsException("An error occurred when logging in. " + e.getMessage());
        }

        if (loginResult != null) {
            return new UsernamePasswordAuthenticationToken(username, password, new ArrayList<>());
        } else {
            throw new BadCredentialsException("Invalid credentials provided");
        }
    }
}
