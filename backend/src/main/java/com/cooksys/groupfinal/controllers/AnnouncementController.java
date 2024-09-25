package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService announcementService;
	
	@GetMapping
	@CrossOrigin(origins = "*")
    public Set<AnnouncementDto> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }
	
	@PostMapping("/company/{companyId}")
	public AnnouncementDto createAnnouncement(@RequestBody AnnouncementDto announcementDto, @PathVariable Long companyId) {
	    return announcementService.createAnnouncement(announcementDto, companyId);
	}
	
	@GetMapping("/company/{companyId}")
	public Set<AnnouncementDto> getAnnouncementsForCompany(@PathVariable Long companyId) {
	    return announcementService.getAnnouncementsForCompany(companyId);
	}
	
	@GetMapping("/company/{companyId}/user/{userId}/isAdmin")
    public boolean isUserAdminForCompany(@PathVariable Long userId, @PathVariable Long companyId) {
        return announcementService.isUserAdminForCompany(userId, companyId);
    }

    @GetMapping("/company/{companyId}/user/{userId}/role")
    public String getUserRoleForCompany(@PathVariable Long userId, @PathVariable Long companyId) {
        return announcementService.getUserRoleForCompany(userId, companyId);
    }

}
