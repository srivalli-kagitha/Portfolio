package com.sri.portfolio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;
    private String about;
    private String image;

    public Profile() {
    }

    public Profile(Long id, String name,
                   String role,
                   String about,
                   String image) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.about = about;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Lob
    @jakarta.persistence.Column(name = "resume_pdf", length = 10485760)
    private byte[] resumePdf;

    public byte[] getResumePdf() {
        return resumePdf;
    }

    public void setResumePdf(byte[] resumePdf) {
        this.resumePdf = resumePdf;
    }
}