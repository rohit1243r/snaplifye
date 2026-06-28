import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
        <Sparkles size={16} />
        Trusted by Businesses Across India
      </div>

      {/* Heading */}
      <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
        Build
        <span className="block bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          Premium Websites
        </span>
        That Grow
        <br />
        Your Business.
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
        We build fast, modern and conversion-focused websites for startups,
        businesses and personal brands using the MERN stack.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Button size="lg" className="px-8">
          Get Free Quote
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="border-slate-700 bg-transparent px-8 text-white hover:bg-slate-800"
        >
          View Portfolio
        </Button>
      </div>
    </motion.div>
  );
}

export default HeroContent;