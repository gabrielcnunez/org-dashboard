package com.cooksys.groupfinal.entities;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Announcement {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@CreationTimestamp
    private Timestamp date;
	
	private String title;
	
	private String message;
	
	@ManyToOne
	private Company company;
	
	@ManyToOne
	private User author;

}
