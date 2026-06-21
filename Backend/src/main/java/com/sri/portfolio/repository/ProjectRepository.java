package com.sri.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sri.portfolio.model.Project;

public interface ProjectRepository
        extends JpaRepository<Project, Long> {

}