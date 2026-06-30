import { motion } from "framer-motion";
import { BarChart3, Star } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function FloatingCard({ icon, title, subtitle, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`absolute rounded-2xl border border-slate-700/60 bg-slate-900/90 p-4 backdrop-blur-xl shadow-lg ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-3"
      >
        <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroImage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex justify-center"
    >
      {/* Background Glow */}
      <div className="hidden md:block absolute md:h-72 md:w-72 lg:h-96 lg:w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Browser Card */}
      <motion.div
        variants={childVariants}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/90 shadow-[0_20px_80px_rgba(6,182,212,0.15)] backdrop-blur-xl"
      >
        {/* Browser Header */}
        <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800/80 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <div className="ml-4 rounded-lg bg-slate-700/80 px-3 py-1 text-xs text-slate-300">
            https://snaplifye.com
          </div>
        </div>

        {/* Website Preview */}
        <div className="p-4">
          <motion.img
            src="/images/hero-preview.png"
            alt="Snaplifye Website Preview"
            className="h-48 w-full rounded-2xl object-cover object-top sm:h-64 md:h-[340px]"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          />

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            {[
              { label: "Projects", value: "120+" },
              { label: "Happy Clients", value: "100+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                className="rounded-xl border border-slate-700 bg-slate-800/70 p-5 backdrop-blur"
              >
                <p className="text-sm text-slate-400">{stat.label}</p>
                <h3 className="mt-2 text-3xl font-bold text-cyan-400">{stat.value}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Cards */}
      <FloatingCard
        icon={<BarChart3 size={20} />}
        title="120+ Projects"
        subtitle="Successfully Delivered"
        className="-left-4 top-12 md:-left-10"
        delay={0.8}
      />
      <FloatingCard
        icon={<Star size={20} />}
        title="4.9/5 Rating"
        subtitle="100+ Happy Clients"
        className="-right-4 bottom-12 md:-right-10"
        delay={1}
      />
    </motion.div>
  );
}

export default HeroImage;
