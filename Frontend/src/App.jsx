import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./admin/Login";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ProjectsAdmin from "./admin/ProjectsAdmin";
import SkillsAdmin from "./admin/SkillsAdmin";
import MessagesAdmin from "./admin/MessagesAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="skills" element={<SkillsAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;