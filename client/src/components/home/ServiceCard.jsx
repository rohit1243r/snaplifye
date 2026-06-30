import { motion } from "framer-motion";

function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
    >
      {/* Index Number */}
      <span className="absolute right-4 top-4 text-4xl font-black text-slate-800/40 transition-colors duration-300 group-hover:text-cyan-500/20">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div className="mb-6 inline-flex rounded-xl bg-cyan-500/10 p-4 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
        <Icon size={32} />
      </div>

      {/* Title */}
      <h3 className="mb-3 text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-400">
        {service.title}
      </h3>

      {/* Description */}
      <p className="leading-7 text-slate-400">
        {service.description}
      </p>

      {/* Bottom Gradient Glow */}
      <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

export default ServiceCard;
