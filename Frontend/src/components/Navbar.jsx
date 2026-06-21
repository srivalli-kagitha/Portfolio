import "./Navbar.css";
import { FaHome, FaUser, FaTools, FaFolderOpen, FaEnvelope } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      
      <div className="logo">
        
      </div>

      <ul className="nav-links">

        <li>
          <a href="#home">
            <FaHome /> Home
          </a>
        </li>

        <li>
          <a href="#about">
            <FaUser /> About
          </a>
        </li>

        <li>
          <a href="#skills">
            <FaTools /> Skills
          </a>
        </li>

        <li>
          <a href="#projects">
            <FaFolderOpen /> Projects
          </a>
        </li>

        <li>
          <a href="#contact">
            <FaEnvelope /> Contact
          </a>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;