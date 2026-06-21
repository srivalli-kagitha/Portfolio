package com.sri.portfolio.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sri.portfolio.model.Admin;

public interface AdminRepository
        extends JpaRepository<Admin, Long> {

    Optional<Admin>
    findByUsername(String username);
}