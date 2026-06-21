import api from "./api";

// Fetch default profile (ID 1) or all profiles
export const getProfile = () => api.get("/api/profile/1");
export const getProfiles = () => api.get("/api/profile");
export const updateProfile = (id, profile) => api.put(`/api/profile/${id}`, profile);

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/api/profile/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};