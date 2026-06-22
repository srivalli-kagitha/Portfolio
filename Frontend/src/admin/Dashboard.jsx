import { useEffect, useState } from "react";
import { getProfile, updateProfile, uploadResume } from "../services/profileService";
import api from "../services/api";
import "./admin.css";

function Dashboard() {
  const [profile, setProfile] = useState({
    id: 1,
    name: "",
    role: "",
    about: "",
    image: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [resumeMsg, setResumeMsg] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      if (response.data) {
        setProfile(response.data);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
      setMsg("Error loading profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      setMsg("Uploading image...");
      const res = await api.post("/api/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data && res.data.url) {
        setProfile(prev => ({ ...prev, image: res.data.url }));
        setMsg("Profile image uploaded successfully!");
      } else {
        setMsg("Upload returned empty response.");
      }
    } catch (err) {
      console.error(err);
      setMsg("Profile image upload failed.");
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const res = await updateProfile(profile.id || 1, profile);
      if (res.data) {
        setProfile(res.data);
        setMsg("Profile details updated successfully!");
      }
    } catch (err) {
      console.error(err);
      setMsg("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setResumeMsg("Please select a PDF file first");
      return;
    }
    setUploading(true);
    setResumeMsg("");
    try {
      await uploadResume(resumeFile);
      setResumeMsg("Resume PDF uploaded successfully!");
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      setResumeMsg("Failed to upload resume PDF.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading Profile details...</div>;
  }

  return (
    <div className="dashboard-content">
      <h2>About Me & Bio Settings</h2>
      <p className="subtitle">Manage details displayed on the home page hero and biography sections.</p>

      {msg && <div className="toast-message">{msg}</div>}

      <div className="admin-forms-grid">
        {/* Profile Info Form */}
        <form onSubmit={handleProfileSubmit} className="admin-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Professional Role / Job Title</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleProfileChange}
              required
            />
          </div>

          <div className="form-group">
            <label>About Me / Biography Description</label>
            <textarea
              name="about"
              value={profile.about}
              onChange={handleProfileChange}
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Profile Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginBottom: "8px" }}
            />
            <label>Or Profile Image Filepath / URL</label>
            <input
              type="text"
              name="image"
              value={profile.image}
              onChange={handleProfileChange}
              placeholder="e.g. profile.jpg or public url"
              required
            />
          </div>

          <button type="submit" className="action-btn" disabled={saving}>
            {saving ? "Saving Profile..." : "Update Profile Details"}
          </button>
        </form>

        {/* Resume PDF Form */}
        <div className="admin-form resume-uploader-card">
          <h3>Resume PDF Manager</h3>
          <p className="subtitle">Upload a new resume PDF which visitors can download.</p>

          {resumeMsg && <div className="toast-message">{resumeMsg}</div>}

          <form onSubmit={handleResumeUpload}>
            <div className="form-group">
              <label>Select PDF Document</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                required
              />
            </div>

            <button type="submit" className="action-btn neon-btn" disabled={uploading}>
              {uploading ? "Uploading PDF..." : "Upload New Resume PDF"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;