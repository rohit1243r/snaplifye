import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  CheckCircle2,
  DollarSign,
  MessageSquare,
  Calendar,
  Clock,
} from "lucide-react";
import { getClientDashboard } from "@/services/client.service";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getClientDashboard();
        setData(res);
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

  const client = JSON.parse(localStorage.getItem("client") || "{}");
  const stats = data?.stats;

  const cards = [
    {
      label: "Active Projects",
      value: stats?.activeProjects ?? 0,
      icon: <FolderKanban size={24} />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      label: "Completed Projects",
      value: stats?.completedProjects ?? 0,
      icon: <CheckCircle2 size={24} />,
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "Pending Payments",
      value: `$${stats?.pendingPayments ?? 0}`,
      icon: <DollarSign size={24} />,
      color: "from-amber-500 to-orange-600",
    },
    {
      label: "Unread Messages",
      value: stats?.unreadMessages ?? 0,
      icon: <MessageSquare size={24} />,
      color: "from-violet-500 to-purple-600",
    },
  ];

  const recentProjects = data?.projects?.slice(0, 3) || [];
  const recentInvoices = data?.invoices?.slice(0, 3) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {client.name || "Client"}
        </h1>
        <p className="mt-1 text-slate-400">Here's your project overview</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition hover:border-slate-700"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 transition group-hover:opacity-5`} />
            <div className="relative z-10">
              <div className={`inline-flex rounded-xl bg-gradient-to-br ${card.color} p-3 text-white`}>
                {card.icon}
              </div>
              <p className="mt-4 text-3xl font-bold text-white">{card.value}</p>
              <p className="mt-1 text-sm text-slate-400">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <AnimatedSection className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
            <Link to="/client/projects" className="text-sm text-cyan-400 hover:underline">
              View All
            </Link>
          </div>
          {recentProjects.length === 0 ? (
            <p className="text-sm text-slate-500">No projects yet.</p>
          ) : (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4"
                >
                  <div>
                    <p className="font-medium text-white">{project.title}</p>
                    <p className="text-sm text-slate-400">{project.category}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    project.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : project.status === "in-progress"
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}>
                    {project.status || "active"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>

        <AnimatedSection className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Invoices</h2>
            <Link to="/client/invoices" className="text-sm text-cyan-400 hover:underline">
              View All
            </Link>
          </div>
          {recentInvoices.length === 0 ? (
            <p className="text-sm text-slate-500">No invoices yet.</p>
          ) : (
            <div className="space-y-4">
              {recentInvoices.map((inv) => (
                <div
                  key={inv._id}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4"
                >
                  <div>
                    <p className="font-medium text-white">{inv.invoiceNumber}</p>
                    <p className="text-sm text-slate-400">${inv.amount}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    inv.status === "paid"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : inv.status === "pending"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}

export default Dashboard;
