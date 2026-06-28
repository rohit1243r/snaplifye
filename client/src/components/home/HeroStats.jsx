import { stats } from "../../data/stats";

function HeroStats() {
  return (
    <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center backdrop-blur"
        >
          <h3 className="text-3xl font-bold text-cyan-400">
            {item.value}
          </h3>

          <p className="mt-2 text-slate-400">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HeroStats;