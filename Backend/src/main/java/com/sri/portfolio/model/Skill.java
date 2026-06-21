package com.sri.portfolio.model;

import jakarta.persistence.*;
import lombok.Data;

@Data

@Entity
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer percentage;

    private String category;

    public Skill() {
    }

    // Generate Getters and Setters
}
