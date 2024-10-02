package com.cooksys.groupfinal.services;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Company;

public interface CompanyService {

	List<CompanyResponseDto> getAllCompanies();

	Set<FullUserDto> getAllUsers(Long id);

	Set<AnnouncementDto> getAllAnnouncements(Long id);

	Set<TeamDto> getAllTeams(Long id);

	List<ProjectResponseDto> getAllProjects(Long companyId, Long teamId);

	ProjectResponseDto getProject(Long companyId, Long teamId, Long projectId);

	ProjectResponseDto postProject(Long companyId, Long teamId, ProjectRequestDto projectRequestDto);

	ProjectResponseDto editProject(Long companyId, Long teamId, Long companyID, ProjectRequestDto projectRequestDto);

	Company findCompany(Long id);
}
