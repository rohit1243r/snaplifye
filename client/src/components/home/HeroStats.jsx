import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { getStats } from "@/services/stats.service";
import { Star } from "lucide-react";

function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const num = parseInt(end);
    if (isNaN(num)) { setCount(end); return; }
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return { count, ref };
}

function StatCard({ item, index }) {
  const displayValue = item.value;
  const { count, ref } = useCountUp(displayValue);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center backdrop-blur transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5"
    >
      {item.icon === "star" ? (
        <div className="flex items-center justify-center gap-1">
          <Star className="size-5 fill-cyan-400 text-cyan-400" />
          <h3 className="text-3xl font-bold text-cyan-400">{displayValue}</h3>
        </div>
      ) : (
        <h3 className="text-3xl font-bold text-cyan-400">
          {item.suffix === "+" ? `${count}+` : displayValue}
        </h3>
      )}
      <p className="mt-2 text-slate-400">{item.label}</p>
    </motion.div>
  );
}

function HeroStats() {
  const [statsData, setStatsData] = useState([
    { id: 1, value: "0", label: "Projects", suffix: "+" },
    { id: 2, value: "0", label: "Clients", suffix: "+" },
    { id: 3, value: "0.0", label: "Rating", icon: "star" },
    { id: 4, value: "24/7", label: "Support" },
  ]);

  useEffect(() => {
    getStats()
      .then((res) => {
        const d = res.data;
        setStatsData([
          { id: 1, value: String(d.projects), label: "Projects", suffix: "+" },
          { id: 2, value: String(d.clients), label: "Clients", suffix: "+" },
          { id: 3, value: d.rating > 0 ? d.rating.toFixed(1) : "0.0", label: "Rating", icon: "star" },
          { id: 4, value: "24/7", label: "Support" },
        ]);
      })
      .catch(() => {
        setStatsData([
          { id: 1, value: "120", label: "Projects", suffix: "+" },
          { id: 2, value: "100", label: "Clients", suffix: "+" },
          { id: 3, value: "4.9", label: "Rating", icon: "star" },
          { id: 4, value: "24/7", label: "Support" },
        ]);
      });
  }, []);

  return (
    <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
      {statsData.map((item, index) => (
        <StatCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

export default HeroStats;
