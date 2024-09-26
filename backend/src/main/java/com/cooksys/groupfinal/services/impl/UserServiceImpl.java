package com.cooksys.groupfinal.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.exceptions.ConflictException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.services.CompanyService;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
    private final FullUserMapper fullUserMapper;
    private final BasicUserMapper basicUserMapper;
	private final CredentialsMapper credentialsMapper;
    private final CompanyService companyService;

	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }

    public User findUser(Long userId) {
        Optional<User> user = userRepository.findByIdAndActiveTrue(userId);
        if (user.isEmpty()) {
            throw new NotFoundException("The ID " + userId + " does not belong to an active user.");
        }
        return user.get();
    }
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

    @Override
    @Transactional
    public FullUserDto loginAdmin(CredentialsDto credentialsDto) {
        FullUserDto requesterDto = login(credentialsDto);

        if (!requesterDto.isAdmin()) {
            throw new NotAuthorizedException("This user is not an administrator.");
        }

        return requesterDto;
    }

    private void checkUserExists(String username) {
        Optional<User> foundOptional = userRepository.findByCredentialsUsername(username);

        if (foundOptional.isPresent()) {
            User found = foundOptional.get();

            if (!found.isActive()) {
                throw new ConflictException("An inactive user with this username already exists.");
            }

            throw new ConflictException("A user with this username already exists.");
        }
    }

    private void checkCredentialsDto(CredentialsDto credentialsDto) {
        String username = credentialsDto.getUsername();
        String password = credentialsDto.getPassword();
        if (username == null || username.isEmpty()) {
            throw new BadRequestException("A username must be provided.");
        }
        if (password == null || password.isEmpty()) {
            throw new BadRequestException("A password must be provided.");
        }
    }

    @Override
    public BasicUserDto createUser(CreateUserDto createUserDto) {
    //public BasicUserDto createUser(UserRequestDto userRequestDto) {
        CredentialsDto credentialsDto = createUserDto.getCredentials();
        UserRequestDto userRequestDto = createUserDto.getUser();

        loginAdmin(credentialsDto);

        checkCredentialsDto(userRequestDto.getCredentials());

        checkUserExists(userRequestDto.getCredentials().getUsername());

        Company company = companyService.findCompany(createUserDto.getCompanyId());

        User created = basicUserMapper.requestDtoToEntity(userRequestDto);
        created.setActive(true);
        Set<Company> companies = created.getCompanies();
        companies.add(company);
        created.setCompanies(companies);

        return basicUserMapper.entityToBasicUserDto(userRepository.saveAndFlush(created));
    }

    @Override
    public List<BasicUserDto> getAllUsers() {
        //Set<User> userSet = new HashSet<>(userRepository.findAll());
        List<User> userList = userRepository.findAllByOrderByActiveDescProfileLastNameAscProfileFirstNameAsc();
        return basicUserMapper.entitiesToBasicUserDtos(userList);
    }
}
