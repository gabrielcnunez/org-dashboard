package com.cooksys.groupfinal.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
	
	private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamMapper teamMapper;

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

}
