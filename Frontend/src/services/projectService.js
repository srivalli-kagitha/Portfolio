import api from "./api";

export const getProjects = () => api.get("/api/projects");
export const addProject = (project) => api.post("/api/projects", project);
export const updateProject = (id, project) => api.put(`/api/projects/${id}`, project);
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);