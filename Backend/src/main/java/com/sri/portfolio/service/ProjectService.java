package com.sri.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sri.portfolio.model.Project;
import com.sri.portfolio.repository.ProjectRepository;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> getAll() {
        return repository.findAll();
    }

    public Project add(Project project) {
        return repository.save(project);
    }

    public Project updateProject(Long id, Project project) {
        Project existing = repository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        existing.setTitle(project.getTitle());
        existing.setDescription(project.getDescription());
        existing.setImage(project.getImage());
        existing.setGithub(project.getGithub());
        existing.setLiveLink(project.getLiveLink());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
