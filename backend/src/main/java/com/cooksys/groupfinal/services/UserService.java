package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

   
}
