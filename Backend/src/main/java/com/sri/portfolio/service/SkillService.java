package com.sri.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sri.portfolio.model.Skill;
import com.sri.portfolio.repository.SkillRepository;

@Service
public class SkillService {

    private final SkillRepository repository;

    public SkillService(SkillRepository repository) {
        this.repository = repository;
    }

    public List<Skill> getAllSkills() {
        return repository.findAll();
    }

    public Skill saveSkill(Skill skill) {
        return repository.save(skill);
    }

    public Skill updateSkill(Long id, Skill skill) {

        Skill existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        existing.setName(skill.getName());
        existing.setPercentage(skill.getPercentage());
        existing.setCategory(skill.getCategory());

        return repository.save(existing);
    }

    public void deleteSkill(Long id) {
        repository.deleteById(id);
    }
}