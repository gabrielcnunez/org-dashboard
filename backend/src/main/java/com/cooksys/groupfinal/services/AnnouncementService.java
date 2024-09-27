package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.AnnouncementDto;

public interface AnnouncementService {

	Set<AnnouncementDto> getAllAnnouncements();

    AnnouncementDto createAnnouncement(AnnouncementDto announcementDto, Long companyId);

	Set<AnnouncementDto> getAnnouncementsForCompany(Long companyId);
	
	boolean isUserAdminForCompany(Long userId, Long companyId);
	
    String getUserRoleForCompany(Long userId, Long companyId);

}
