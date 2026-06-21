package com.sri.portfolio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sri.portfolio.model.Profile;
import com.sri.portfolio.repository.ProfileRepository;

@Service
public class ProfileService {

    private final ProfileRepository repository;

    public ProfileService(ProfileRepository repository) {
        this.repository = repository;
    }

    public List<Profile> getAllProfiles() {
        return repository.findAll();
    }

    public Profile getProfile(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Profile saveProfile(Profile profile) {
        return repository.save(profile);
    }

    public Profile updateProfile(Long id,
                                 Profile profile) {

        Profile existing =
                repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setName(profile.getName());
        existing.setRole(profile.getRole());
        existing.setAbout(profile.getAbout());
        existing.setImage(profile.getImage());

        return repository.save(existing);
    }

    public void updateResume(Long id, byte[] data) {
        Profile existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setResumePdf(data);
            repository.save(existing);
        }
    }
}