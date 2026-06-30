import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  User,
  Code2,
  ExternalLink,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getClientDashboard } from "@/services/client.service";

const statusColors = {
  "not-started": "bg-slate-500/10 text-slate-400",
  "in-progress": "bg-cyan-500/10 text-cyan-400",
  completed: "bg-emerald-500/10 text-emerald-400",
  "on-hold": "bg-amber-500/10 text-amber-400",
  cancelled: "bg-red-500/10 text-red-400",
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getClientDashboard();
        setProjects(res.projects || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">My Projects</h1>
        <p className="mt-1 text-slate-400">View all assigned projects</p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
          <p className="text-slate-400">No projects assigned yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, idx) => (
            <AnimatedSection key={project._id} delay={idx * 0.05}>
              <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[project.status] || statusColors["not-started"]}`}>
                      {project.status || "not-started"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400">{project.category}</p>

                  {project.description && (
                    <p className="line-clamp-2 text-sm text-slate-500">{project.description}</p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 border-t border-slate-800 pt-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size= {14} />
                      <span>Start: {project.startDate ? new Date(project.startDate).toLocaleDateString() : "TBD"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Delivery: {project.expectedDelivery ? new Date(project.expectedDelivery).toLocaleDateString() : "TBD"}</span>
                    </div>
                    {project.manager && (
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>Manager: {project.manager}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
