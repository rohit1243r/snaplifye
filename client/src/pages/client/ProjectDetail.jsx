import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getClientDashboard } from "@/services/client.service";

const progressData = [
  { label: "UI Design", pct: 100, color: "from-cyan-500 to-blue-600" },
  { label: "Frontend", pct: 80, color: "from-blue-500 to-indigo-600" },
  { label: "Backend", pct: 60, color: "from-violet-500 to-purple-600" },
  { label: "Testing", pct: 20, color: "from-amber-500 to-orange-600" },
  { label: "Deployment", pct: 0, color: "from-slate-400 to-slate-600" },
];

const timeline = [
  { stage: "Project Created", date: "2025-01-10", status: "completed" },
  { stage: "Requirement Discussion", date: "2025-01-15", status: "completed" },
  { stage: "UI Design Completed", date: "2025-02-01", status: "completed" },
  { stage: "Frontend Completed", date: "2025-03-10", status: "completed" },
  { stage: "Backend Development", date: "2025-04-05", status: "in-progress" },
  { stage: "Testing", date: null, status: "pending" },
  { stage: "Deployment", date: null, status: "pending" },
  { stage: "Completed", date: null, status: "pending" },
];

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getClientDashboard();
        const found = (res.projects || []).find((p) => p._id === id);
        setProject(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
        <p className="text-slate-400">Project not found.</p>
        <Link to="/client/projects" className="mt-4 inline-block text-cyan-400 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  const overallPct = Math.round(
    progressData.reduce((sum, p) => sum + p.pct, 0) / progressData.length
  );

  return (
    <div className="space-y-8">
      <Link
        to="/client/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-white">{project.title}</h1>
        <p className="mt-1 text-slate-400">{project.category}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <AnimatedSection className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="mb-6 text-lg font-semibold text-white">Project Progress</h2>
          <div className="space-y-5">
            {progressData.map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="font-medium text-white">{item.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">Overall Progress</span>
              <span className="text-3xl font-bold text-cyan-400">{overallPct}%</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="mb-6 text-lg font-semibold text-white">Project Timeline</h2>
          <div className="relative space-y-0">
            {timeline.map((item, idx) => (
              <div key={item.stage} className="flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    item.status === "completed"
                      ? "border-emerald-500 bg-emerald-500/10"
                      : item.status === "in-progress"
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-slate-700 bg-slate-800/50"
                  }`}>
                    {item.status === "completed" ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : item.status === "in-progress" ? (
                      <Clock size={14} className="text-cyan-400" />
                    ) : (
                      <Circle size={14} className="text-slate-600" />
                    )}
                  </div>
                  {idx < timeline.length - 1 && (
                    <div className="h-full w-0.5 bg-slate-800" />
                  )}
                </div>
                <div className="pt-1">
                  <p className={`font-medium ${
                    item.status === "completed"
                      ? "text-white"
                      : item.status === "in-progress"
                      ? "text-cyan-300"
                      : "text-slate-500"
                  }`}>
                    {item.stage}
                  </p>
                  {item.date && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default ProjectDetail;
