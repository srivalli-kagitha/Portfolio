package com.sri.portfolio.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sri.portfolio.config.JwtUtil;
import com.sri.portfolio.dto.LoginRequest;
import com.sri.portfolio.dto.LoginResponse;
import com.sri.portfolio.model.Admin;
import com.sri.portfolio.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AdminService(
            AdminRepository repository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public boolean login(String username, String password) {
        Optional<Admin> admin = repository.findByUsername(username);
        return admin.isPresent() && passwordEncoder.matches(password, admin.get().getPassword());
    }

    public LoginResponse authenticate(LoginRequest request) {
        Optional<Admin> admin = repository.findByUsername(request.getUsername());
        if (admin.isPresent() && passwordEncoder.matches(request.getPassword(), admin.get().getPassword())) {
            String token = jwtUtil.generateToken(admin.get().getUsername());
            return new LoginResponse(
                    token,
                    admin.get().getUsername(),
                    "ROLE_ADMIN",
                    jwtUtil.getExpirationMs()
            );
        }
        return null;
    }
}

