package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService announcementService;
	
	@GetMapping
	@CrossOrigin(origins="*")
    public Set<AnnouncementDto> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }
	
	@PostMapping("/company/{companyId}")
	@CrossOrigin(origins="*")
	public AnnouncementDto createAnnouncement(@RequestBody AnnouncementDto announcementDto, @PathVariable Long companyId) {
	    return announcementService.createAnnouncement(announcementDto, companyId);
	}
	
	@GetMapping("/company/{companyId}")
	@CrossOrigin(origins="*")
	public Set<AnnouncementDto> getAnnouncementsForCompany(@PathVariable Long companyId) {
	    return announcementService.getAnnouncementsForCompany(companyId);
	}
	
	@GetMapping("/company/{companyId}/user/{userId}/isAdmin")
	@CrossOrigin(origins="*")
    public boolean isUserAdminForCompany(@PathVariable Long userId, @PathVariable Long companyId) {
        return announcementService.isUserAdminForCompany(userId, companyId);
    }

    @GetMapping("/company/{companyId}/user/{userId}/role")
	@CrossOrigin(origins="*")
    public String getUserRoleForCompany(@PathVariable Long userId, @PathVariable Long companyId) {
        return announcementService.getUserRoleForCompany(userId, companyId);
    }

}
