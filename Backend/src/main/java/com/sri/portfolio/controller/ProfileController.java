package com.sri.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sri.portfolio.model.Profile;
import com.sri.portfolio.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping
    public List<Profile> getProfiles() {
        return service.getAllProfiles();
    }

    @GetMapping("/{id}")
    public Profile getProfile(
            @PathVariable Long id) {

        return service.getProfile(id);
    }

    @PostMapping
    public Profile saveProfile(
            @RequestBody Profile profile) {

        return service.saveProfile(profile);
    }

    @PutMapping("/{id}")
    public Profile updateProfile(
            @PathVariable Long id,
            @RequestBody Profile profile) {

        return service.updateProfile(id,profile);
    }

    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        try {
            service.updateResume(1L, file.getBytes());
            return ResponseEntity.ok("Resume uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload resume: " + e.getMessage());
        }
    }

    @GetMapping("/resume")
    public ResponseEntity<byte[]> downloadResume() {
        Profile profile = service.getProfile(1L);
        if (profile == null || profile.getResumePdf() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"resume.pdf\"")
                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                .body(profile.getResumePdf());
    }
}