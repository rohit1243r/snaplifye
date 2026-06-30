import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

function ProjectsTable({ projects, onEdit, onDelete }) {
  if (projects.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Projects Found
        </h2>
        <p className="mt-3 text-slate-400">
          Click "Add Project" to create your first project.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-950">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Project
              </th>
              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Featured
              </th>
              <th className="px-6 py-4 text-left text-sm text-slate-400">
                Links
              </th>
              <th className="px-6 py-4 text-center text-sm text-slate-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                className="border-t border-slate-800 hover:bg-slate-800/40"
              >
                <td className="px-6 py-4">
                  <img
                    src={
                      project.image ||
                      "https://placehold.co/80x60?text=No+Image"
                    }
                    alt={project.title}
                    className="h-14 w-20 rounded-lg object-cover"
                  />
                </td>
                <td className="px-6 py-4">
                  <h3 className="font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                    {project.description}
                  </p>
                </td>
                <td className="px-6 py-4 text-slate-300">
                  {project.category}
                </td>
                <td className="px-6 py-4">
                  {project.rating > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                      ★ {project.rating.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-500">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      project.featured
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {project.featured ? "Featured" : "Normal"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-slate-300"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(project)}
                      className="rounded-lg bg-cyan-500 p-2 hover:bg-cyan-600 text-white"
                    >
                      <MdEdit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(project._id)}
                      className="rounded-lg bg-red-500 p-2 hover:bg-red-600 text-white"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsTable;