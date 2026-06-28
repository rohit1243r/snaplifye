import { motion } from "framer-motion";

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
    >
      {/* Icon */}
      <div className="mb-6 inline-flex rounded-xl bg-cyan-500/10 p-4 text-cyan-400 transition group-hover:scale-110">
        <Icon size={32} />
      </div>

      {/* Title */}
      <h3 className="mb-3 text-2xl font-semibold text-white">
        {service.title}
      </h3>

      {/* Description */}
      <p className="leading-7 text-slate-400">
        {service.description}
      </p>
    </motion.div>
  );
}

export default ServiceCard;