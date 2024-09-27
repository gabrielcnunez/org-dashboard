package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.services.TeamService;

import org.springframework.web.bind.annotation.*;



import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class
TeamController {
	
	private final TeamService teamService;

    @GetMapping
	@CrossOrigin(origins="*")
    public List<TeamDto> getAllTeams(@RequestParam Long userId) {
        return teamService.getAllTeams(userId);
    }

    @PostMapping("/create")
	@CrossOrigin(origins="*")
    public TeamDto createTeam(@RequestBody TeamRequestDto teamRequestDto) { return teamService.createTeam(teamRequestDto); }

}
