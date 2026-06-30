import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import useQuoteDialog from "@/hooks/useQuoteDialog";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function HeroContent() {
  const { open } = useQuoteDialog();
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl"
    >
      {/* Badge */}
      <motion.div
        variants={childVariants}
        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300"
      >
        <Sparkles size={16} />
        Trusted by Businesses Across India
      </motion.div>

      {/* Heading */}
      <motion.h1 variants={childVariants} className="mt-8 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-7xl">
        Build
        <span className="block bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          Premium Websites
        </span>
        That Grow
        <br />
        Your Business.
      </motion.h1>

      {/* Description */}
      <motion.p variants={childVariants} className="mt-8 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-400">
        We build fast, modern and conversion-focused websites for startups,
        businesses and personal brands using the MERN stack.
      </motion.p>

      {/* Buttons */}
      <motion.div variants={childVariants} className="mt-10 flex flex-wrap gap-4">
        <Button
          onClick={open}
          size="lg"
          className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 px-8 text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50 active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Get Free Quote
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-300 group-hover:translate-y-0" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/portfolio")}
          className="group border-slate-700 bg-transparent px-8 text-white transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-95"
        >
          View Portfolio
          <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;
