import { useEffect, useState } from "react";
import { getSkills } from "../services/skillService";
import "./Skills.css";
import {
  FaJava,
  FaReact,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaCode,
  FaChartBar
} from "react-icons/fa";
import { SiSpringboot, SiMysql, SiPython } from "react-icons/si";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills()
      .then((res) => {
        if (res.data) {
          setSkills(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load skills", err);
      });
  }, []);

  const getSkillIcon = (name) => {
    if (!name) return <FaCode />;
    const lower = name.toLowerCase();
    if (lower.includes("java") && !lower.includes("javascript")) return <FaJava />;
    if (lower.includes("spring")) return <SiSpringboot />;
    if (lower.includes("tableau")) return <FaChartBar />;
    if (lower.includes("react")) return <FaReact />;
    if (lower.includes("mysql")) return <SiMysql />;
    if (lower.includes("python")) return <SiPython />;
    if (lower.includes("html")) return <FaHtml5 />;
    if (lower.includes("css")) return <FaCss3Alt />;
    if (lower.includes("git")) return <FaGitAlt />;
    if (lower.includes("sql") || lower.includes("database") || lower.includes("db") || lower.includes("h2")) return <FaDatabase />;
    return <FaCode />;
  };

  return (
    <section className="skills" id="skills">
      <div className="section-title">
      <h2>Technical Expertise</h2>
<p> Technologies and Analytical tools I leverage to build modern and scalable applications.</p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={skill.id || index}>
            <div className="skill-icon">
              {getSkillIcon(skill.name)}
            </div>
            <h3>{skill.name}</h3>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="no-data">No skills added yet.</p>
        )}
      </div>
    </section>
  );
}

export default Skills;