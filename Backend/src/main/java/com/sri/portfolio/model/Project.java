package com.sri.portfolio.model;

import jakarta.persistence.*;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 3000)
    private String description;

    private String image;

    private String github;

    private String liveLink;

    public Project() {
    }

    public Project(Long id,
                   String title,
                   String description,
                   String image,
                   String github,
                   String liveLink) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.github = github;
        this.liveLink = liveLink;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getLiveLink() {
        return liveLink;
    }

    public void setLiveLink(String liveLink) {
        this.liveLink = liveLink;
    }
}