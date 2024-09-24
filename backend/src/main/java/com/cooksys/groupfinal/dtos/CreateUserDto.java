package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CreateUserDto {

    private CredentialsDto credentials;

    private UserRequestDto user;

}