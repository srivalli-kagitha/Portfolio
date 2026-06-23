import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import "./Hero.css";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Hero() {
  const [profile, setProfile] = useState({
    name: "Srivalli Kagitha",
    role: "Java Full Stack Developer",
    about: "Passionate Final year Graduate seeking an opportunity to apply technical skills, learn from industry experience, and contribute effectively in a professional environment.",
    image: "profile.jpg"
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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      <div className="hero-left">
        <h3>Hi, I'm</h3>

        <h1>
          <span className="name">{profile.name}</span>
        </h1>

        <TypeAnimation
          sequence={[
            profile.role || "Java Full Stack Developer",
            1000,
            "Data Analyst Enthusiast",
            1000,
            "Final Year IT Graduate",
            1000,
            "Quick learner",
            1000
          ]}
          speed={60}
          repeat={Infinity}
          className="typing"
        />

        <p className="desc">{profile.about}</p>

        <div className="buttons">
          <button className="primaryBtn" onClick={scrollToContact}>
            Contact Me
          </button>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="secondaryBtn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none"
            }}
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-image-wrap">
          <div className="image-card">
            <img
              src={profile.image?.startsWith("http") ? profile.image : (profile.image?.startsWith("project-images") ? `${import.meta.env.VITE_API_BASE_URL || ""}/${profile.image}` : `/${profile.image}`)}
              alt="profile"
              className="profile-image"
            />
          </div>
        </div>

        <div className="social-icons">
          <a href="https://github.com/srivalli-kagitha" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>

          <a href="https://linkedin.com/in/srivallikagitha01" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;