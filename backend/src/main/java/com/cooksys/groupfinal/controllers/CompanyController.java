package com.cooksys.groupfinal.controllers;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;

	@GetMapping("/all")
	@CrossOrigin(origins="*")
	public List<CompanyResponseDto> getAllCompanies() {
		return companyService.getAllCompanies();
	}

	@GetMapping("/{id}/users")
	@CrossOrigin(origins="*")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
	
	@GetMapping("/{id}/announcements")
	@CrossOrigin(origins="*")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
	
	@GetMapping("/{id}/teams")
	@CrossOrigin(origins="*")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }
	
	@GetMapping("/{companyId}/teams/{teamId}/projects") 
	@CrossOrigin(origins="*")
	public List<ProjectResponseDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}
	
	@GetMapping("/{companyId}/teams/{teamId}/projects/{projectId}") 
	@CrossOrigin(origins="*")
	public ProjectResponseDto getProject(@PathVariable Long companyId, @PathVariable Long teamId, @PathVariable Long projectId) {
		return companyService.getProject(companyId, teamId, projectId);
	}
	
	@PostMapping("/{companyId}/teams/{teamId}/projects")
	@CrossOrigin(origins="*")
	@ResponseStatus(HttpStatus.CREATED)
	public ProjectResponseDto postProject(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody ProjectRequestDto projectRequestDto) {
		return companyService.postProject(companyId, teamId, projectRequestDto);
	}
	
	@PatchMapping("/{companyId}/teams/{teamId}/projects/{projectId}/edit")
	@CrossOrigin(origins="*")
	public ProjectResponseDto editProject(@PathVariable Long companyId, @PathVariable Long teamId, @PathVariable Long projectId, @RequestBody ProjectRequestDto projectRequestDto) {
		return companyService.editProject(companyId, teamId, projectId, projectRequestDto);
	}

}
