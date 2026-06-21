package com.sri.portfolio.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.sri.portfolio.model.Skill;
import com.sri.portfolio.service.SkillService;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    private final SkillService service;

    public SkillController(SkillService service) {
        this.service = service;
    }

    @GetMapping
    public List<Skill> getSkills() {
        return service.getAllSkills();
    }

    @PostMapping
    public Skill saveSkill(
            @RequestBody Skill skill) {

        return service.saveSkill(skill);
    }

    @PutMapping("/{id}")
    public Skill updateSkill(
            @PathVariable Long id,
            @RequestBody Skill skill) {

        return service.updateSkill(id, skill);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(
            @PathVariable Long id) {

        service.deleteSkill(id);
    }
}