package com.cooksys.groupfinal.services.impl;

import java.util.ArrayList;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.mappers.*;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final CompanyRepository companyRepository;
	private final ProjectRepository projectRepository;
	private final TeamRepository teamRepository;
	private final FullUserMapper fullUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;
	private final CompanyMapper companyMapper;

	public List<CompanyResponseDto> getAllCompanies() {
		return companyMapper.entitiesToDtos(companyRepository.findAllByOrderByNameAsc());
	}
	
	public Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        return company.get();
    }
	
	private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }
	
	private Project findProject(Long id) {
		Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()) {
            throw new NotFoundException("A project with the provided id does not exist.");
        }
        return project.get();
	}
	
	private Team findTeamInCompany(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		
		return team;
	}
	
	private Project findProjectInTeam(Long companyId, Long teamId, Long projectId) {
		Team team = findTeamInCompany(companyId, teamId);
		Project project = findProject(projectId);
		if (!team.getProjects().contains(project)) {
			throw new NotFoundException("A project with id " + projectId + " does not exist on team with id " + teamId + ".");
		}
        
		return project;
    }
	
	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		//filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToDtos(sortedSet);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public List<ProjectResponseDto> getAllProjects(Long companyId, Long teamId) {
		Team team = findTeamInCompany(companyId, teamId);
		List<Project> sortedProjects = new ArrayList<Project>(team.getProjects());
		sortedProjects.sort(Comparator.comparing(Project::getId).reversed());
		return projectMapper.entitiesToDtos(sortedProjects);
	}

	@Override
	public ProjectResponseDto getProject(Long companyId, Long teamId, Long projectId) {
		Project project = findProjectInTeam(companyId, teamId, projectId);
		return projectMapper.entityToDto(project);
	}
	
	@Override
	public ProjectResponseDto postProject(Long companyId, Long teamId, ProjectRequestDto projectRequestDto) {
		Team team = findTeamInCompany(companyId, teamId);
		Project projectToPost = projectMapper.requestDtoToEntity(projectRequestDto);
		projectToPost.setTeam(team);
		
		return projectMapper.entityToDto(projectRepository.saveAndFlush(projectToPost));
	}

	@Override
	public ProjectResponseDto editProject(Long companyId, Long teamId, Long projectId, ProjectRequestDto projectRequestDto) {
		Project projectToEdit = findProjectInTeam(companyId, teamId, projectId);
		projectToEdit.setName(projectRequestDto.getName());
		projectToEdit.setDescription(projectRequestDto.getDescription());
		projectToEdit.setActive(projectRequestDto.isActive());
		
		return projectMapper.entityToDto(projectRepository.saveAndFlush(projectToEdit));
	}

}
