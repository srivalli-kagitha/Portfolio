import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import "./About.css";
import { FaCode, FaLaptopCode, FaServer } from "react-icons/fa";

function About() {
  const [profile, setProfile] = useState({
    name: "Srivalli Kagitha",
    role: "Java Full Stack Developer",
    about: "I am a passionate Java Full Stack Developer who enjoys building modern, responsive, and user-friendly web applications using Java, Spring Boot, React, and MySQL."
  });

  useEffect(() => {
    getProfile()
      .then((res) => {
        if (res.data) {
          setProfile(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load profile", err);
      });
  }, []);

  return (
    <section className="about" id="about">
      <div className="section-title">
        <h2>Profile Overview</h2>
<p>Exploring opportunities in software development and data analytics.</p>
      </div>

      <div className="about-container">
        {/* TEXT SECTION */}
        <div className="about-text">
          <h3>{profile.role}</h3>
          <p>Aspiring Java Full Stack Developer and Data Analytics Enthusiast with hands-on experience in Java, Spring Boot, React, MySQL, and data visualization tools.I am eager to apply my skills, learn from industry experiences, and contribute effectively in a professional environment.</p>

        </div>

        {/* CARDS SECTION */}
        <div className="about-cards">
          <div className="card">
            <FaCode className="icon" />
            <h4>Frontend</h4>
            <p>HTML, CSS, JavaScript, React</p>
          </div>

          <div className="card">
            <FaServer className="icon" />
            <h4>Backend</h4>
            <p>Java, Spring Boot, REST APIs</p>
          </div>

          <div className="card">
            <FaLaptopCode className="icon" />
            <h4>Database</h4>
            <p>H2 Database, MySQL, JPA</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;