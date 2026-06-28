import { motion } from "framer-motion";
import AnalyticsCard from "./AnalyticsCard";
import ReviewCard from "./ReviewCard";

function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex justify-center"
    >
      {/* Background Glow */}
      <div className="absolute h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Browser Card */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/90 shadow-[0_20px_80px_rgba(6,182,212,0.15)] backdrop-blur-xl">

        {/* Browser Header */}
        <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>

          <div className="ml-4 rounded-lg bg-slate-700 px-3 py-1 text-xs text-slate-300">
            https://snaplifye.com
          </div>
        </div>

        {/* Website Preview */}
        <div className="p-4">
          <img
            src="/images/hero-preview.png"
            alt="Snaplifye Website Preview"
            className="h-[340px] w-full rounded-2xl object-cover object-top transition duration-500 hover:scale-[1.02]"
          />

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-4">

            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-5 backdrop-blur">
              <p className="text-sm text-slate-400">
                Projects
              </p>

              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                120+
              </h3>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-5 backdrop-blur">
              <p className="text-sm text-slate-400">
                Happy Clients
              </p>

              <h3 className="mt-2 text-3xl font-bold text-cyan-400">
                100+
              </h3>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Cards */}
      <AnalyticsCard />
      <ReviewCard />
    </motion.div>
  );
}

export default HeroImage;