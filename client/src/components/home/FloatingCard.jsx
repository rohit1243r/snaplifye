import { motion } from "framer-motion";

function FloatingCard({
  icon,
  title,
  subtitle,
  className = "",
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-2xl border border-slate-700 bg-slate-900/80 p-4 backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-cyan-400">
          {icon}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">
            {title}
          </h4>

          <p className="text-xs text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default FloatingCard;