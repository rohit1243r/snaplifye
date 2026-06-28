import { motion } from "framer-motion";

function ProcessCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:border-cyan-500"
    >
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
        <Icon size={32} />
      </div>

      <h3 className="mb-3 text-xl font-bold text-white">
        {item.title}
      </h3>

      <p className="text-slate-400">
        {item.description}
      </p>
    </motion.div>
  );
}

export default ProcessCard;