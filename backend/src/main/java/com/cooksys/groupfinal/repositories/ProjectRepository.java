package com.cooksys.groupfinal.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cooksys.groupfinal.entities.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	@Query("SELECT p FROM Project p WHERE p.team.id = :teamId ORDER BY p.id DESC")
	List<Project> findProjectsByTeamSorted(@Param("teamId") Long teamId);
}