import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, MessageCircle, Calendar } from "lucide-react";
import useQuoteDialog from "@/hooks/useQuoteDialog";

function AnimatedNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <span>{display.toLocaleString()}{suffix}</span>;
}

function CostResult({ result, onReset, formData }) {
  const { open } = useQuoteDialog();
  const { estimatedCost, estimatedTime, complexity, techStack, teamSize, packageSuggestion, summary } = result;

  const complexityColor =
    complexity === "Low" ? "text-green-400" : complexity === "Medium" ? "text-amber-400" : "text-rose-400";
  const complexityBg =
    complexity === "Low" ? "bg-green-500/10" : complexity === "Medium" ? "bg-amber-500/10" : "bg-rose-500/10";

  const handleDownloadPDF = () => {
    const content = `
Snaplifye - Cost Estimate
==========================
Website Type: ${formData.websiteType}
Pages: ${formData.pages}
Features: ${formData.features?.join(", ") || "None"}
Design: ${formData.designQuality}

Estimated Cost: ₹${estimatedCost.min.toLocaleString()} - ₹${estimatedCost.max.toLocaleString()}
Estimated Time: ${estimatedTime} Days
Complexity: ${complexity}
Tech Stack: ${techStack.join(", ")}
Team Size: ${teamSize}
Package: ${packageSuggestion}

${summary}
    `.trim();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Snaplifye-Estimate-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareWhatsApp = () => {
    const msg = encodeURIComponent(
      `🚀 *Snaplifye Cost Estimate*%0A%0A📌 *Type:* ${formData.websiteType}%0A📄 *Pages:* ${formData.pages}%0A💰 *Estimate:* ₹${estimatedCost.min.toLocaleString()} - ₹${estimatedCost.max.toLocaleString()}%0A⏱ *Time:* ${estimatedTime} Days%0A📊 *Complexity:* ${complexity}%0A%0ABuilt by Snaplifye - https://snaplifye.com`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-400"
        >
          <span className="text-3xl">🚀</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-white">Your Estimate is Ready!</h2>
        <p className="mt-2 text-slate-400">Based on your selections</p>
      </div>

      {/* Cost */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-6 text-center"
      >
        <p className="text-sm text-slate-400">Estimated Cost</p>
        <p className="mt-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          ₹<AnimatedNumber value={estimatedCost.min} /> – ₹<AnimatedNumber value={estimatedCost.max} />
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Dev Time", value: estimatedTime, suffix: " Days", color: "text-blue-400" },
          { label: "Complexity", value: complexity, color: complexityColor, custom: true },
          { label: "Team Size", value: teamSize, color: "text-purple-400", custom: true },
          { label: "Package", value: packageSuggestion, color: "text-cyan-400", custom: true },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className={`rounded-xl border border-slate-800 p-4 text-center ${item.label === "Complexity" ? complexityBg : "bg-slate-800/30"}`}
          >
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className={`mt-1 text-lg font-bold ${item.color}`}>
              {item.custom ? item.value : <AnimatedNumber value={item.value} suffix={item.suffix} />}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <p className="mb-3 text-sm font-medium text-slate-400">Recommended Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-sm text-cyan-400">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-8 rounded-xl border border-slate-800 bg-slate-950/50 p-4"
      >
        <p className="mb-2 text-xs font-medium text-slate-500">Project Summary</p>
        <p className="text-sm leading-6 text-slate-300">{summary}</p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-wrap gap-3"
      >
        <Button
          onClick={open}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 active:scale-95"
        >
          Request Quote
        </Button>
        <Button
          onClick={() => {
            open();
            onReset();
          }}
          variant="outline"
          className="flex-1 border-slate-700 text-white hover:bg-slate-800"
        >
          <Calendar className="mr-2 size-4" />
          Book Consultation
        </Button>
        <Button
          onClick={handleDownloadPDF}
          variant="outline"
          className="border-slate-700 text-white hover:bg-slate-800"
        >
          <Download className="mr-2 size-4" />
          PDF
        </Button>
        <Button
          onClick={handleShareWhatsApp}
          variant="outline"
          className="border-green-600/50 text-green-400 hover:bg-green-500/10"
        >
          <MessageCircle className="mr-2 size-4" />
          WhatsApp
        </Button>
      </motion.div>

      {/* Recalculate */}
      <div className="mt-4 text-center">
        <button onClick={onReset} className="text-sm text-slate-500 underline transition hover:text-cyan-400">
          Recalculate
        </button>
      </div>
    </motion.div>
  );
}

export default CostResult;
