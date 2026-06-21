package com.sri.portfolio.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sri.portfolio.dto.LoginRequest;
import com.sri.portfolio.dto.LoginResponse;
import com.sri.portfolio.service.AdminService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = service.authenticate(loginRequest);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}