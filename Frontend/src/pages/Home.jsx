import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#000",
          minHeight: "100vh",
        }}
      >
        <div id="home">
          <Navbar />
          <Hero />
        </div>

        <div
          style={{
            width: "80%",
            height: "2px",
            margin: "20px auto",
            background:
              "linear-gradient(90deg, transparent, #00e5ff, #00ffa2, #00e5ff, transparent)",
            boxShadow:
              "0 0 10px #00e5ff, 0 0 20px rgba(0,229,255,0.6)",
          }}
        />

        <div id="about">
          <About />
        </div>

        <div
          style={{
            width: "80%",
            height: "2px",
            margin: "20px auto",
            background:
              "linear-gradient(90deg, transparent, #00e5ff, #00ffa2, #00e5ff, transparent)",
            boxShadow:
              "0 0 10px #00e5ff, 0 0 20px rgba(0,229,255,0.6)",
          }}
        />

        <div id="skills">
          <Skills />
        </div>

        <div
          style={{
            width: "80%",
            height: "2px",
            margin: "20px auto",
            background:
              "linear-gradient(90deg, transparent, #00e5ff, #00ffa2, #00e5ff, transparent)",
            boxShadow:
              "0 0 10px #00e5ff, 0 0 20px rgba(0,229,255,0.6)",
          }}
        />

        <div id="projects">
          <Projects />
        </div>

        <div
          style={{
            width: "80%",
            height: "2px",
            margin: "20px auto",
            background:
              "linear-gradient(90deg, transparent, #00e5ff, #00ffa2, #00e5ff, transparent)",
            boxShadow:
              "0 0 10px #00e5ff, 0 0 20px rgba(0,229,255,0.6)",
          }}
        />

        <div id="contact">
          <Contact />
        </div>

        <div id="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;