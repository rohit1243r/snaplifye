import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import CostEstimatorForm from "@/components/cost-estimator/CostEstimatorForm";
import CostResult from "@/components/cost-estimator/CostResult";
import { calculateCost } from "@/services/costEstimate.service";
import { Sparkles, Calculator } from "lucide-react";

function CostEstimator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleCalculate = async (data) => {
    setLoading(true);
    try {
      const res = await calculateCost(data);
      setResult(res.data);
      setFormData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData(null);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 py-24">
      {/* Background Effects */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
            <Sparkles size={16} />
            AI-Powered Calculator
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Website Cost
            <span className="block bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Estimator
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Answer a few questions and get an instant estimate for your website project
          </p>
        </motion.div>

        {/* Calculator / Result */}
        <div className="mx-auto max-w-3xl">
          {result && formData ? (
            <CostResult result={result} onReset={handleReset} formData={formData} />
          ) : (
            <CostEstimatorForm onCalculate={handleCalculate} loading={loading} />
          )}
        </div>
      </Container>
    </section>
  );
}

export default CostEstimator;
