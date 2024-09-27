package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CompanyResponseDto {
	
	private Long id;
    
    private String name;
    
    private String description;

}