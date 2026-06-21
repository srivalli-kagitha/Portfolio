const BASE_URL = "http://localhost:8080/api/projects";

// GET all projects
export const getProjects = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// ADD project
export const addProject = async (project) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

  return res.json();
};

// DELETE project
export const deleteProject = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};