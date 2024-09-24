package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;

import java.util.List;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);


	List<BasicUserDto> getAllUsers(CredentialsDto credentialsDto);
}
