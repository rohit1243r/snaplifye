import { motion } from "framer-motion";

function SectionTitle({
  title,
  subtitle,
  center = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={center ? "text-center" : ""}
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-cyan-400"
      >
        {subtitle}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
      >
        {title}
        <span className="mt-3 block mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
      </motion.h2>
    </motion.div>
  );
}

export default SectionTitle;
