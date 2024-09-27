package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.User;

import java.util.List;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

	FullUserDto loginAdmin(CredentialsDto credentialsDto);

	User findUser(Long id);

	//BasicUserDto createUser(UserRequestDto userRequestDto);
	BasicUserDto createUser(CreateUserDto createUserDto);

	List<BasicUserDto> getAllUsers();
}
