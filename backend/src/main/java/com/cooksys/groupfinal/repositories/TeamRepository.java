package com.cooksys.groupfinal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    
	List<Team> findByTeammatesContaining(User user);

}