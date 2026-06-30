import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Mail, Building2, Calendar, ChevronRight } from "lucide-react";
import AdminLayout from "@/layouts/AdminLayout";
import { getClients } from "@/services/adminClient.service";

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getClients(search);
        setClients(res.clients || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetch, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Clients</h1>
            <p className="text-sm text-slate-400">Manage registered clients</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
          </div>
        ) : clients.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <p className="text-slate-400">No clients found.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="px-6 py-4 text-left font-medium text-slate-400">Name</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-400">Email</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-400">Company</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-400">Joined</th>
                  <th className="px-6 py-4 text-right font-medium text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {clients.map((client) => (
                  <tr key={client._id} className="bg-slate-900/30 transition hover:bg-slate-800/40">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
                          {client.name?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                        <span className="font-medium text-white">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{client.email}</td>
                    <td className="px-6 py-4 text-slate-400">{client.company || "—"}</td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(client.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/clients/${client._id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/20"
                      >
                        View
                        <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Clients;
