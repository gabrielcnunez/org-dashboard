package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.services.CompanyService;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.TeamService;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
	
	private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamMapper teamMapper;
    private final UserService userService;
    private final CompanyService companyService;

    @Override
    public List<TeamDto> getAllTeams(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new NotFoundException("User not found"));

        List<Team> teams;
        if (user.isAdmin()) {
            teams = teamRepository.findAll();
        } else {
            teams = teamRepository.findByTeammatesContaining(user);
        }

        return teams.stream()
            .map(team -> {
                TeamDto dto = teamMapper.entityToDto(team);
                dto.setProjectCount(team.getProjects().size());
                return dto;
            })
            .collect(Collectors.toList());
    }

    /**
     * Verify teammates exist and that they are added to the company's employees.
     * @param company The company this team is assigned to.
     * @param userIds The userIds of the teammates.
     * @return Set<User>
     */
    private Set<User> findTeammates(Company company, Set<Long> userIds) {
        Set<User> teammates = new HashSet<>();

        for (Long userId: userIds) {
            User user = userService.findUser(userId);
            Set<Company> userCompanies = user.getCompanies();
            if (!userCompanies.contains(company)) {
                userCompanies.add(company);
                user.setCompanies(userCompanies);
            }
            teammates.add(user);
        }

        return teammates;
    }

    /**
     * (Admin only) Create a new team
     * @param teamRequestDto The admin credentials and the team request
     * @return TeamDto
     */
    @Override
    public TeamDto createTeam(TeamRequestDto teamRequestDto) {
        CredentialsDto credentialsDto = teamRequestDto.getCredentials();
        Long companyId = teamRequestDto.getCompanyId();
        Team team = new Team();

        //verify credentials
        userService.loginAdmin(credentialsDto);

        //verify company and teammates
        Company company = companyService.findCompany(companyId);
        Set<User> teammates = findTeammates(company, teamRequestDto.getTeammateIds());

        //verify teamName and teamDescription are provided
        String teamName = teamRequestDto.getName();
        String teamDescription = teamRequestDto.getDescription();

        if (teamName == null || teamName.isEmpty()) {
            throw new BadRequestException("A team name must be provided.");
        }

        if (teamDescription == null || teamDescription.isEmpty()) {
            throw new BadRequestException("A team description must be provided.");
        }

        //create the team
        team.setName(teamName);
        team.setDescription(teamDescription);
        team.setCompany(company);
        team.setTeammates(teammates);

        return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
    }

}
