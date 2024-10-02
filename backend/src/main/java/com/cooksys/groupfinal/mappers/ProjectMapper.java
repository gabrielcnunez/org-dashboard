package com.cooksys.groupfinal.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.dtos.ProjectResponseDto;
import com.cooksys.groupfinal.entities.Project;

@Mapper(componentModel = "spring", uses = { TeamMapper.class })
public interface ProjectMapper {
	
	Project requestDtoToEntity(ProjectRequestDto projectRequestDto);
	
	ProjectResponseDto entityToDto(Project project);

    List<ProjectResponseDto> entitiesToDtos(List<Project> projects);

}
