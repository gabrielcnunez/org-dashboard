package com.cooksys.groupfinal.mappers;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.CompanyResponseDto;
import org.mapstruct.Mapper;

import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.entities.Company;

@Mapper(componentModel = "spring", uses = { TeamMapper.class, BasicUserMapper.class })
public interface CompanyMapper {
	
	CompanyDto entityToDto(Company company);

    Set<CompanyDto> entitiesToDtos(Set<Company> companies);

    List<CompanyResponseDto> entitiesToDtos(List<Company> companies);

}
