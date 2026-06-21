package com.sri.portfolio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sri.portfolio.model.Project;
import com.sri.portfolio.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService service;

    @GetMapping
    public List<Project> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Project add(@RequestBody Project project) {
        return service.add(project);
    }

    @PutMapping("/{id}")
    public Project update(@PathVariable Long id, @RequestBody Project project) {
        return service.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}