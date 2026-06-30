import { Eye, Mail, MessageSquare, Briefcase, Star } from "lucide-react";

const cards = [
  { key: "visitors", label: "Total Visitors", icon: <Eye size={22} />, color: "text-blue-400 bg-blue-500/10" },
  { key: "totalLeads", label: "Total Leads", icon: <Mail size={22} />, color: "text-cyan-400 bg-cyan-500/10" },
  { key: "contactRequests", label: "Contact Requests", icon: <MessageSquare size={22} />, color: "text-purple-400 bg-purple-500/10" },
  { key: "totalProjects", label: "Total Projects", icon: <Briefcase size={22} />, color: "text-amber-400 bg-amber-500/10" },
  { key: "totalTestimonials", label: "Total Testimonials", icon: <Star size={22} />, color: "text-green-400 bg-green-500/10" },
];

function AnalyticsCards({ stats }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div key={card.key} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">{card.label}</p>
            <div className={`rounded-xl p-3 ${card.color}`}>{card.icon}</div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">
            {stats?.[card.key] ?? 0}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;
