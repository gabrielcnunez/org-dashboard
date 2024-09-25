package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.dtos.ProjectResponseDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Company;

public interface CompanyService {

	Set<FullUserDto> getAllUsers(Long id);

	Set<AnnouncementDto> getAllAnnouncements(Long id);

	Set<TeamDto> getAllTeams(Long id);

	Set<ProjectResponseDto> getAllProjects(Long companyId, Long teamId);

	ProjectResponseDto getProject(Long companyId, Long teamId, Long projectId);

	ProjectResponseDto postProject(Long companyId, Long teamId, ProjectRequestDto projectRequestDto);

	ProjectResponseDto editProject(Long companyId, Long teamId, Long companyID, ProjectRequestDto projectRequestDto);

	Company findCompany(Long id);
}
