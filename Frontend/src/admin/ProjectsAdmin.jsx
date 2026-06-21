import { useEffect, useState } from "react";
import { getProjects, addProject, updateProject, deleteProject } from "../services/projectService";
import "./admin.css";

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    liveLink: ""
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      image: project.image,
      github: project.github || "",
      liveLink: project.liveLink || ""
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      image: "",
      github: "",
      liveLink: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      if (editingId) {
        // Edit
        await updateProject(editingId, form);
        setMsg("Project updated successfully!");
      } else {
        // Add
        await addProject(form);
        setMsg("Project added successfully!");
      }
      handleCancel();
      loadProjects();
    } catch (err) {
      console.error(err);
      setMsg("Operation failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setMsg("Project deleted successfully!");
      loadProjects();
    } catch (err) {
      console.error(err);
      setMsg("Failed to delete project.");
    }
  };

  if (loading) {
    return <div className="loading">Loading projects list...</div>;
  }

  return (
    <div className="dashboard-content">
      <h2>Manage Projects</h2>
      <p className="subtitle">Add, edit, or remove projects shown on your live portfolio.</p>

      {msg && <div className="toast-message">{msg}</div>}

      <div className="admin-crud-layout">
        {/* Project Form */}
        <form onSubmit={handleSubmit} className="admin-form crud-form">
          <h3>{editingId ? "Edit Project" : "Add Project"}</h3>

          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Netflix Clone"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Describe the project..."
            />
          </div>

          <div className="form-group">
            <label>GitHub Repository URL</label>
            <input
              type="url"
              name="github"
              value={form.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="form-group">
            <label>Live Demo URL (Optional)</label>
            <input
              type="url"
              name="liveLink"
              value={form.liveLink}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label>Image Filename / URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="e.g. project1.jpg or web link"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="action-btn">
              {editingId ? "Save Changes" : "Create Project"}
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Projects Grid List */}
        <div className="crud-list">
          <h3>Current Projects List</h3>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>GitHub Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td className="truncate-cell">{project.github || "N/A"}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(project)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(project.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", color: "#888" }}>
                      No projects found. Add one on the left!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsAdmin;
