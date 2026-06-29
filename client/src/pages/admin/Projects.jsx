import { useEffect, useState } from "react";
import { toast } from "sonner";

import AdminLayout from "@/layouts/AdminLayout";
import ProjectsTable from "@/components/projects/ProjectsTable";
import ProjectDialog from "@/components/projects/ProjectDialog";

import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/services/project.service";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();

      setProjects(res.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editingProject) {
        await updateProject(editingProject._id, data);

        toast.success("Project updated successfully");
      } else {
        await createProject(data);

        toast.success("Project created successfully");
      }

      setDialogOpen(false);

      setEditingProject(null);

      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Delete this project?"
    );

    if (!confirm) return;

    try {
      await deleteProject(id);

      toast.success("Project deleted");

      fetchProjects();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Projects
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your portfolio projects
            </p>

          </div>

          <button
            onClick={() => {
              setEditingProject(null);

              setDialogOpen(true);
            }}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-600"
          >
            + Add Project
          </button>

        </div>

        <ProjectsTable
          projects={projects}
          onEdit={(project) => {
            setEditingProject(project);

            setDialogOpen(true);
          }}
          onDelete={handleDelete}
        />

        <ProjectDialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);

            setEditingProject(null);
          }}
          onSubmit={handleSubmit}
          editingProject={editingProject}
        />

      </div>
    </AdminLayout>
  );
}

export default Projects;