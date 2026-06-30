import { motion } from "framer-motion";

function Particle({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function BackgroundEffects() {
  return (
    <>
      {/* Floating Particles */}
      <Particle className="top-20 left-[10%] h-2 w-2 bg-cyan-400/40 blur-[2px]" delay={0} />
      <Particle className="top-40 right-[15%] h-1.5 w-1.5 bg-blue-400/30 blur-[2px]" delay={0.5} />
      <Particle className="top-60 left-[25%] h-2.5 w-2.5 bg-cyan-300/30 blur-[2px]" delay={1} />
      <Particle className="top-80 right-[30%] h-1 w-1 bg-sky-400/40 blur-[2px]" delay={1.5} />
      <Particle className="top-96 left-[40%] h-2 w-2 bg-cyan-500/30 blur-[2px]" delay={2} />
      <Particle className="top-32 right-[45%] h-1.5 w-1.5 bg-blue-300/25 blur-[2px]" delay={2.5} />

      {/* Top Glow */}
      <div className="hidden md:block absolute left-0 top-0 h-72 w-72 lg:h-96 lg:w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Right Glow */}
      <div className="hidden md:block absolute right-0 top-40 h-72 w-72 lg:h-96 lg:w-96 rounded-full bg-blue-500/20 blur-[140px]" />

      {/* Bottom Glow */}
      <div className="hidden md:block absolute bottom-0 left-1/2 h-72 w-72 lg:h-96 lg:w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[150px]" />

      {/* Gradient Orbs */}
      <motion.div
        className="hidden md:block absolute top-1/3 left-1/4 h-48 w-48 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden md:block absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-purple-500/5 to-cyan-500/5 blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -45, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </>
  );
}

export default BackgroundEffects;
