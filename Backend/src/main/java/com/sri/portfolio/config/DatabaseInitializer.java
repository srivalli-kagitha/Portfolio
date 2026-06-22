package com.sri.portfolio.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.sri.portfolio.model.Admin;
import com.sri.portfolio.model.Profile;
import com.sri.portfolio.model.Skill;
import com.sri.portfolio.model.Project;
import com.sri.portfolio.repository.AdminRepository;
import com.sri.portfolio.repository.ProfileRepository;
import com.sri.portfolio.repository.SkillRepository;
import com.sri.portfolio.repository.ProjectRepository;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseInitializer(
            AdminRepository adminRepository,
            ProfileRepository profileRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize admin if none exists or re-hash if plaintext
        java.util.Optional<Admin> existingAdmin = adminRepository.findByUsername("admin");
        if (existingAdmin.isPresent()) {
            Admin admin = existingAdmin.get();
            String pwd = admin.getPassword();
            if (pwd == null || (!pwd.startsWith("$2a$") && !pwd.startsWith("$2b$") && !pwd.startsWith("$2y$"))) {
                admin.setPassword(passwordEncoder.encode("adminpassword"));
                adminRepository.save(admin);
                System.out.println("Existing admin password hashed with BCrypt.");
            }
        } else {
            Admin defaultAdmin = new Admin();
            defaultAdmin.setUsername("admin");
            defaultAdmin.setPassword(passwordEncoder.encode("adminpassword"));
            adminRepository.save(defaultAdmin);
            System.out.println("Default admin created: admin / adminpassword");
        }

        // Initialize profile if none exists
        if (profileRepository.count() == 0) {
            Profile defaultProfile = new Profile();
            defaultProfile.setName("Srivalli Kagitha");
            defaultProfile.setRole("Java Full Stack Developer");
            defaultProfile.setAbout("I am a passionate Java Full Stack Developer who enjoys building modern, responsive, and user-friendly web applications using Java, Spring Boot, React, and MySQL.");
            defaultProfile.setImage("profile.jpg");
            profileRepository.save(defaultProfile);
            System.out.println("Default profile created.");
        }

        // Initialize default skills if none exist
        if (skillRepository.count() == 0) {
            createDefaultSkill("Java", 90, "Backend");
            createDefaultSkill("Spring Boot", 85, "Backend");
            createDefaultSkill("React", 80, "Frontend");
            createDefaultSkill("MySQL", 85, "Database");
            createDefaultSkill("HTML5", 95, "Frontend");
            createDefaultSkill("CSS3", 90, "Frontend");
            createDefaultSkill("Python", 75, "DevOps");
            createDefaultSkill("SQL", 85, "Database");
            System.out.println("Default skills created.");
        }

        // Initialize default projects if none exist
        if (projectRepository.count() == 0) {
            Project p1 = new Project();
            p1.setTitle("Netflix Dashboard & Analysis");
            p1.setDescription("An interactive data analysis dashboard built to process and visualize Netflix dataset distributions, show types, releases, and content ratings.");
            p1.setImage("project-images/Netflix_dashboard.jpg");
            p1.setGithub("https://github.com/srivalli-kagitha/netflix-analysis");
            p1.setLiveLink("https://netflix-dashboard.onrender.com");
            projectRepository.save(p1);

            Project p2 = new Project();
            p2.setTitle("Machine Learning Classifier");
            p2.setDescription("A machine learning application utilizing prediction models to analyze structured datasets, track performance metrics, and classify records in real-time.");
            p2.setImage("project-images/mlproject.jpg");
            p2.setGithub("https://github.com/srivalli-kagitha/ml-classifier");
            p2.setLiveLink("https://ml-classifier.onrender.com");
            projectRepository.save(p2);

            Project p3 = new Project();
            p3.setTitle("Developer Portfolio Website");
            p3.setDescription("A full-stack portfolio website highlighting technical skills and projects, built with React, Spring Boot, Spring Security, JWT, and persistent data storage.");
            p3.setImage("project-images/portfolio.jpg");
            p3.setGithub("https://github.com/srivalli-kagitha/Portfolio");
            p3.setLiveLink("https://portfolio.onrender.com");
            projectRepository.save(p3);

            System.out.println("Default projects seeded.");
        }
    }

    private void createDefaultSkill(String name, int percentage, String category) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setPercentage(percentage);
        skill.setCategory(category);
        skillRepository.save(skill);
    }
}

