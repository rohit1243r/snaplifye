import api from "./api";

// Get All Projects
export const getAllProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

// Create Project
export const createProject = async (data) => {
  const res = await api.post("/projects", data);
  return res.data;
};

// Update Project
export const updateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

// Delete Project
export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

// Get Single Project
export const getProject = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};