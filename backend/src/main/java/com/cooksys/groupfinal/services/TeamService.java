package com.cooksys.groupfinal.services;

import java.util.List;

import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.dtos.TeamDto;

public interface TeamService {

    List<TeamDto> getAllTeams(Long userId);

    TeamDto createTeam(TeamRequestDto teamRequestDto);

}
