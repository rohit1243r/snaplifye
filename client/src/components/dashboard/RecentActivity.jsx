import { UserPlus, MessageSquare, FolderKanban, Star, Clock } from "lucide-react";

const iconMap = {
  lead: { icon: <UserPlus size={16} />, bg: "bg-cyan-500/10 text-cyan-400" },
  contact: { icon: <MessageSquare size={16} />, bg: "bg-purple-500/10 text-purple-400" },
  project: { icon: <FolderKanban size={16} />, bg: "bg-amber-500/10 text-amber-400" },
  testimonial: { icon: <Star size={16} />, bg: "bg-green-500/10 text-green-400" },
};

function RecentActivity({ activities }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">Recent Activity</h2>
      <div className="space-y-4">
        {activities.length === 0 && (
          <p className="text-center text-slate-500 py-8">No recent activity</p>
        )}
        {activities.map((item, i) => {
          const style = iconMap[item.type] || iconMap.lead;
          const timeAgo = getTimeAgo(item.time);
          return (
            <div key={i} className="flex items-start gap-4 rounded-xl border border-slate-800/50 bg-slate-950/50 p-4">
              <div className={`flex shrink-0 size-9 items-center justify-center rounded-lg ${style.bg}`}>
                {style.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{item.text}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={12} />
                  {timeAgo}
                </div>
              </div>
              {item.status && (
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                  item.status === "New" ? "bg-cyan-500/10 text-cyan-400" :
                  item.status === "Completed" ? "bg-green-500/10 text-green-400" :
                  "bg-slate-500/10 text-slate-400"
                }`}>
                  {item.status}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getTimeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export default RecentActivity;
