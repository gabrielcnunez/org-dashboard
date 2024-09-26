package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.*;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/login")
	@CrossOrigin(origins="*")
    public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
        return userService.login(credentialsDto);
    }

    @PostMapping("/create")
	@CrossOrigin(origins="*")
    public BasicUserDto createUser(@RequestBody CreateUserDto createUserDto) { return userService.createUser(createUserDto); }

    @GetMapping("")
	@CrossOrigin(origins="*")
    public List<BasicUserDto> getAllUsers() { return userService.getAllUsers(); }


}
