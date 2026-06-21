import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data || []);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  return (
    <section className="projects" id="projects">
      <div className="section-title">
        <h2>Projects</h2>
        <p>Explore some of the projects I've built and the technologies I've worked with.</p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <img
              src={project.image?.startsWith("http") || project.image?.startsWith("data:") ? project.image : `/${project.image || 'placeholder.jpg'}`}
              alt={project.title}
              className="project-image"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60";
              }}
            />

            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link-btn github-btn"
                  >
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="link-icon">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                    GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link-btn live-btn"
                  >

                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="link-icon">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {projects.length === 0 && (
        <p style={{ textAlign: "center", color: "#888", width: "100%", gridColumn: "1 / -1" }}>No projects added yet.</p>
      )}
    </section>
  );
}

export default Projects;