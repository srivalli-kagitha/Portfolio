package com.sri.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sri.portfolio.model.Skill;

public interface SkillRepository
        extends JpaRepository<Skill, Long> {

}