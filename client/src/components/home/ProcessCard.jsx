import { motion } from "framer-motion";

function ProcessCard({ item, index, length }) {
  const Icon = item.icon;
  const isLast = index === length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
    >
      {/* Step Number */}
      <div className="mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15 text-sm font-bold text-cyan-400 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">
        {index + 1}
      </div>

      {/* Icon */}
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
        <Icon size={32} />
      </div>

      {/* Connecting Line (except last) */}
      {!isLast && (
        <div className="hidden lg:block absolute right-0 top-1/2 w-full">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
            className="origin-left h-px bg-gradient-to-r from-cyan-500/50 to-transparent"
            style={{ transform: "translateX(50%)" }}
          />
        </div>
      )}

      <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
        {item.title}
      </h3>

      <p className="text-slate-400">
        {item.description}
      </p>
    </motion.div>
  );
}

export default ProcessCard;
