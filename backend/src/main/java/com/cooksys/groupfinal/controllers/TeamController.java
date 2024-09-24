package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.cooksys.groupfinal.dtos.TeamDto;


import com.cooksys.groupfinal.services.TeamService;

import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;

    @GetMapping
    public List<TeamDto> getAllTeams(@RequestParam Long userId) {
        return teamService.getAllTeams(userId);
    }

}
