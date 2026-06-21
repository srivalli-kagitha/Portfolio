package com.sri.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sri.portfolio.model.Profile;

public interface ProfileRepository
        extends JpaRepository<Profile, Long> {

}