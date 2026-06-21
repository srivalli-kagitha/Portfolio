import { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/admin");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-nav-links">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            About Me / Resume
          </Link>
          <Link to="/dashboard/projects" className={isActive("/dashboard/projects")}>
            Projects CRUD
          </Link>
          <Link to="/dashboard/skills" className={isActive("/dashboard/skills")}>
            Skills CRUD
          </Link>
          <Link to="/dashboard/messages" className={isActive("/dashboard/messages")}>
            Messages Panel
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <Link to="/" className="portfolio-link">
            View Live Site
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="main-header">
          <h1>Welcome, Admin</h1>
        </div>
        <div className="content-card">
          <Outlet />
        </div>
      </div>
    </div>
  );
}