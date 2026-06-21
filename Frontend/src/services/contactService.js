import api from "./api";

export const saveContact = (data) => api.post("/api/contact", data);
export const getContacts = () => api.get("/api/contact");
export const deleteContact = (id) => api.delete(`/api/contact/${id}`);