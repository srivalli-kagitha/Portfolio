package com.sri.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sri.portfolio.model.Profile;
import com.sri.portfolio.service.ProfileService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
private Cloudinary cloudinary;
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
        @RequestParam("file") MultipartFile file) {

    try {

        Map<?, ?> uploadResult =
                cloudinary.uploader()
                           .upload(
                               file.getBytes(),
                               ObjectUtils.asMap(
                                   "resource_type",
                                   "raw"
                               )
                           );

        String resumeUrl =
                uploadResult.get("secure_url")
                            .toString();

        service.updateResumeUrl(
                1L,
                resumeUrl
        );

        return ResponseEntity.ok(
                Map.of(
                    "url",
                    resumeUrl
                )
        );

    } catch (Exception e) {

        return ResponseEntity
                .internalServerError()
                .body(
                    "Failed to upload resume: "
                    + e.getMessage()
                );
    }
}

    @GetMapping("/resume")
public ResponseEntity<?> downloadResume() {

    Profile profile =
            service.getProfile(1L);

    if (profile == null ||
        profile.getResumeUrl() == null) {

        return ResponseEntity
                .notFound()
                .build();
    }

    return ResponseEntity.ok(
            Map.of(
                "url",
                profile.getResumeUrl()
            )
    );
}
}