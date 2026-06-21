import { useEffect, useState } from "react";
import { getSkills, addSkill, updateSkill, deleteSkill } from "../services/skillService";
import "./admin.css";

function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Frontend"
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await getSkills();
      setSkills(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "number" ? parseInt(e.target.value) : e.target.value
    });
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setForm({
      name: skill.name,
      category: skill.category || "Frontend"
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      name: "",
      category: "Frontend"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      if (editingId) {
        // Edit
        await updateSkill(editingId, form);
        setMsg("Skill updated successfully!");
      } else {
        // Add
        await addSkill(form);
        setMsg("Skill added successfully!");
      }
      handleCancel();
      loadSkills();
    } catch (err) {
      console.error(err);
      setMsg("Operation failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill(id);
      setMsg("Skill deleted successfully!");
      loadSkills();
    } catch (err) {
      console.error(err);
      setMsg("Failed to delete skill.");
    }
  };

  if (loading) {
    return <div className="loading">Loading skills list...</div>;
  }

  return (
    <div className="dashboard-content">
      <h2>Manage Skills</h2>
      <p className="subtitle">Add, edit, or remove technologies shown on your live portfolio.</p>

      {msg && <div className="toast-message">{msg}</div>}

      <div className="admin-crud-layout">
        {/* Skill Form */}
        <form onSubmit={handleSubmit} className="admin-form crud-form">
          <h3>{editingId ? "Edit Skill" : "Add Skill"}</h3>

          <div className="form-group">
            <label>Skill Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Java, React, Docker"
            />
          </div>


          <div className="form-group">
            <label>Category Group</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps / Others</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="action-btn">
              {editingId ? "Save Changes" : "Create Skill"}
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Skills Table List */}
        <div className="crud-list">
          <h3>Current Skills List</h3>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
          
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td>{skill.name}</td>
            
                    <td>{skill.category || "N/A"}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(skill)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(skill.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {skills.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
                      No skills found. Add one on the left!
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

export default SkillsAdmin;
