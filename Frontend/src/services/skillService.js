import api from "./api";

export const getSkills = () => api.get("/api/skills");
export const addSkill = (skill) => api.post("/api/skills", skill);
export const updateSkill = (id, skill) => api.put(`/api/skills/${id}`, skill);
export const deleteSkill = (id) => api.delete(`/api/skills/${id}`);
