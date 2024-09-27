package com.cooksys.groupfinal.dtos;

import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TeamRequestDto {

    private CredentialsDto credentials;

    private String name;
    
    private String description;
    
    private Set<Long> teammateIds;

    private Long companyId;

}
