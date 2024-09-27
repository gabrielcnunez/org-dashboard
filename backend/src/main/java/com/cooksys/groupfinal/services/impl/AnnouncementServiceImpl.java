package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
	
	
	private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;


    @Override
	public Set<AnnouncementDto> getAllAnnouncements() {
	    List<Announcement> announcements = announcementRepository.findAll();
	    Set<AnnouncementDto> announcementDtos = new HashSet<>();
	    for (Announcement announcement : announcements) {
	        AnnouncementDto dto = announcementMapper.entityToDto(announcement);
	        announcementDtos.add(dto);
	    }
	    return announcementDtos;
	}

	@Override
	@Transactional
	public AnnouncementDto createAnnouncement(AnnouncementDto announcementDto, Long companyId) {
	    if (announcementDto.getTitle() == null || announcementDto.getTitle().isEmpty()) {
	        throw new BadRequestException("Announcement title cannot be empty");
	    }
	    if (announcementDto.getMessage() == null || announcementDto.getMessage().isEmpty()) {
	        throw new BadRequestException("Announcement message cannot be empty");
	    }

	    Company company = companyRepository.findById(companyId)
	        .orElseThrow(() -> new NotFoundException("Company not found"));

	    BasicUserDto authorDto = announcementDto.getAuthor();
	    User author = userRepository.findById(authorDto.getId())
	        .orElseThrow(() -> new NotFoundException("User not found"));

	    if (!author.isActive()) {
	        throw new BadRequestException("User is not active");
	    }

	    if (!author.getCompanies().contains(company)) {
	        throw new BadRequestException("User is not part of the specified company");
	    }

	    if (!author.isAdmin()) {
	        throw new BadRequestException("Only admins can create announcements");
	    }

	    Announcement announcement = new Announcement();
	    announcement.setTitle(announcementDto.getTitle());
	    announcement.setMessage(announcementDto.getMessage());
	    announcement.setCompany(company);
	    announcement.setAuthor(author);

	    Announcement savedAnnouncement = announcementRepository.save(announcement);

	    return announcementMapper.entityToDto(savedAnnouncement);
	}

	//allows to fetch announcements specific to a company
	@Override
	public Set<AnnouncementDto> getAnnouncementsForCompany(Long companyId) {
	    Company company = companyRepository.findById(companyId)
	        .orElseThrow(() -> new NotFoundException("Company not found"));
	    return announcementMapper.entitiesToDtos(new HashSet<>(company.getAnnouncements()));
	}

	@Override
    public boolean isUserAdminForCompany(Long userId, Long companyId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new NotFoundException("User not found"));
        Company company = companyRepository.findById(companyId)
            .orElseThrow(() -> new NotFoundException("Company not found"));
        return user.isAdmin() && user.getCompanies().contains(company);
    }

    @Override
    public String getUserRoleForCompany(Long userId, Long companyId) {
        if (isUserAdminForCompany(userId, companyId)) {
            return "ADMIN";
        } else {
            return "WORKER";
        }
    }

}