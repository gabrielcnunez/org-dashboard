package com.cooksys.groupfinal.mappers;

import java.util.Set;

import org.mapstruct.Mapper;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = { BasicUserMapper.class })
public interface TeamMapper {

	@Mapping(target = "projectCount", expression = "java(team.getProjects() != null ? team.getProjects().size() : 0)")
	TeamDto entityToDto(Team team);

	Set<TeamDto> entitiesToDtos(Set<Team> teams);

}