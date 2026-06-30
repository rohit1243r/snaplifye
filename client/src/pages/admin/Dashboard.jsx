import AdminLayout from "@/layouts/AdminLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import LeadsTable from "@/components/dashboard/LeadsTable";
import LeadDetailsDialog from "@/components/dashboard/LeadDetailsDialog";
import AnalyticsCards from "@/components/dashboard/AnalyticsCards";
import LeadsTrendChart from "@/components/dashboard/LeadsTrendChart";
import ContactRequestsChart from "@/components/dashboard/ContactRequestsChart";
import ProjectCategoriesChart from "@/components/dashboard/ProjectCategoriesChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import LatestLeadsTable from "@/components/dashboard/LatestLeadsTable";
import { getAllQuotes } from "@/services/quote.service";
import { getAnalytics } from "@/services/analytics.service";
import { exportToCSV } from "@/utils/exportCSV";
import StatusChart from "@/components/dashboard/StatusChart";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, Activity } from "lucide-react";

import {
    Users,
    Mail,
    CheckCircle,
    Clock,
    Search,
    Download,
} from "lucide-react";

function Dashboard() {
    const [quotes, setQuotes] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [analytics, setAnalytics] = useState(null);

    const [selectedLead, setSelectedLead] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const leadsPerPage = 10;

    const fetchQuotes = async () => {
        try {
            const res = await getAllQuotes();
            setQuotes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const res = await getAnalytics();
            setAnalytics(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchQuotes();
        fetchAnalytics();
    }, []);

    const filteredQuotes = useMemo(() => {
        return quotes.filter((quote) => {
            const keyword = search.toLowerCase();

            const matchesSearch =
                quote.name?.toLowerCase().includes(keyword) ||
                quote.email?.toLowerCase().includes(keyword) ||
                quote.phone?.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === "All" ||
                quote.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [quotes, search, statusFilter]);

    const totalPages = Math.ceil(
        filteredQuotes.length / leadsPerPage
    );

    const paginatedQuotes = filteredQuotes.slice(
        (currentPage - 1) * leadsPerPage,
        currentPage * leadsPerPage
    );

    return (
        <AdminLayout>
            <div className="p-8">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Welcome back 👋
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                    <StatsCard
                        title="Total Leads"
                        value={quotes.length}
                        icon={<Users />}
                    />

                    <StatsCard
                        title="New Leads"
                        value={
                            quotes.filter((q) => q.status === "New").length
                        }
                        icon={<Mail />}
                    />

                    <StatsCard
                        title="Completed"
                        value={
                            quotes.filter(
                                (q) => q.status === "Completed"
                            ).length
                        }
                        icon={<CheckCircle />}
                    />

                    <StatsCard
                        title="Pending"
                        value={
                            quotes.filter(
                                (q) => q.status !== "Completed"
                            ).length
                        }
                        icon={<Clock />}
                    />

                </div>

                {/* Search + Filter + Export */}
                <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex flex-col gap-4 md:flex-row md:items-center">

                        {/* Search */}
                        <div className="relative w-full md:w-96">

                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />

                            <input
                                type="text"
                                placeholder="Search by name, email or phone..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none transition focus:border-cyan-500"
                            />

                        </div>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                        >
                            <option value="All">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>

                    </div>

                    {/* Export */}
                    <button
                        onClick={() => exportToCSV(filteredQuotes)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
                    >
                        <Download size={18} />
                        Export CSV
                    </button>

                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-2">

                    <MonthlyChart quotes={quotes} />

                    <StatusChart quotes={quotes} />

                </div>

                {/* Table */}
                <LeadsTable
                    quotes={paginatedQuotes}
                    refreshQuotes={fetchQuotes}
                    onView={(lead) => {
                        setSelectedLead(lead);
                        setDialogOpen(true);
                    }}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-slate-800 pt-6">

                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1)
                                )
                            }
                            disabled={currentPage === 1}
                            className="rounded-lg border border-slate-700 px-4 py-2 text-white transition hover:bg-slate-800 disabled:opacity-40"
                        >
                            Previous
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setCurrentPage(index + 1)
                                    }
                                    className={`rounded-lg px-4 py-2 transition ${currentPage === index + 1
                                            ? "bg-cyan-500 text-white"
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}

                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="rounded-lg border border-slate-700 px-4 py-2 text-white transition hover:bg-slate-800 disabled:opacity-40"
                        >
                            Next
                        </button>

                    </div>
                )}

                {/* Dialog */}
                <LeadDetailsDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    quote={selectedLead}
                />

                {/* ---- Analytics Section ---- */}
                <div className="mt-16 border-t border-slate-800 pt-12">
                    <div className="mb-8 flex items-center gap-3">
                        <BarChart3 className="size-6 text-cyan-400" />
                        <h2 className="text-2xl font-bold text-white">Analytics Overview</h2>
                    </div>

                    <AnalyticsCards stats={analytics?.stats} />

                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                        <LeadsTrendChart
                            daily={analytics?.leadsTrend || []}
                            weekly={analytics?.weeklyLeads || []}
                            monthly={analytics?.monthlyLeads || []}
                        />
                        <ContactRequestsChart data={analytics?.contactsByDate || []} />
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <ProjectCategoriesChart data={analytics?.projectCategories || []} />
                        <RecentActivity activities={analytics?.recentActivity || []} />
                    </div>

                    <div className="mt-6">
                        <LatestLeadsTable leads={analytics?.latestLeads || []} />
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}

export default Dashboard;
