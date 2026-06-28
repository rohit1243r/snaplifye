import { ArrowUpRight } from "lucide-react";

function StatsCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-cyan-500/10 p-4 text-cyan-400">
          {icon}
        </div>

      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-green-400">
        <ArrowUpRight size={16} />
        <span>Updated just now</span>
      </div>
    </div>
  );
}

export default StatsCard;