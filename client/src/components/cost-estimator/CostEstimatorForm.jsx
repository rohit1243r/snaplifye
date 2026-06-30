import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import StepIndicator from "./StepIndicator";

const websiteTypes = [
  "Business Website", "Portfolio Website", "E-Commerce", "School",
  "Hospital", "Restaurant", "Real Estate", "Landing Page", "Blog", "Custom Web Application",
];

const pageOptions = ["1-5", "5-10", "10-20", "20+"];

const allFeatures = [
  "Admin Dashboard", "Authentication", "Payment Gateway", "Booking System",
  "Blog", "SEO", "WhatsApp Integration", "Contact Form", "AI Chatbot", "Email Integration",
];

const designOptions = ["Basic", "Standard", "Premium"];

const stepVariants = {
  enter: (direction) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -200 : 200, opacity: 0 }),
};

function CostEstimatorForm({ onCalculate, loading }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    websiteType: "",
    pages: "",
    features: [],
    designQuality: "",
    description: "",
  });

  const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const toggleFeature = (feat) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feat)
        ? prev.features.filter((f) => f !== feat)
        : [...prev.features, feat],
    }));
  };

  const next = () => { setDirection(1); setStep((s) => Math.min(s + 1, 5)); };
  const prev = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 1)); };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.websiteType;
      case 2: return formData.pages;
      case 3: return true;
      case 4: return formData.designQuality;
      default: return false;
    }
  };

  const handleSubmit = () => {
    if (!formData.websiteType || !formData.pages || !formData.designQuality) return;
    onCalculate(formData);
  };

  return (
    <div>
      <StepIndicator currentStep={step} />

      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl sm:p-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Step 1 - Website Type */}
            {step === 1 && (
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Choose Your Website Type</h3>
                <p className="mb-6 text-slate-400">Select the type of website you need</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {websiteTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => update("websiteType", type)}
                      className={`rounded-xl border px-5 py-4 text-left font-medium transition-all duration-200 ${
                        formData.websiteType === type
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10"
                          : "border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 - Pages */}
            {step === 2 && (
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Number of Pages</h3>
                <p className="mb-6 text-slate-400">How many pages does your website need?</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {pageOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => update("pages", opt)}
                      className={`rounded-xl border px-6 py-5 text-center font-medium transition-all duration-200 ${
                        formData.pages === opt
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10"
                          : "border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                      }`}
                    >
                      <span className="text-lg">{opt} Pages</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 - Features */}
            {step === 3 && (
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Select Features</h3>
                <p className="mb-6 text-slate-400">Choose the features you need (optional)</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {allFeatures.map((feat) => {
                    const selected = formData.features.includes(feat);
                    return (
                      <button
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className={`flex items-center gap-3 rounded-xl border px-5 py-4 text-left font-medium transition-all duration-200 ${
                          selected
                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                            : "border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded border text-[11px] font-bold transition ${
                            selected
                              ? "border-cyan-500 bg-cyan-500 text-white"
                              : "border-slate-600 text-transparent"
                          }`}
                        >
                          {selected ? "✓" : ""}
                        </span>
                        {feat}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4 - Design Quality */}
            {step === 4 && (
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Design Quality</h3>
                <p className="mb-6 text-slate-400">Choose your preferred design tier</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {designOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => update("designQuality", opt)}
                      className={`rounded-xl border px-6 py-6 text-center transition-all duration-200 ${
                        formData.designQuality === opt
                          ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                          : "border-slate-700 bg-slate-800/40 hover:border-slate-600"
                      }`}
                    >
                      <p className={`text-lg font-bold ${
                        formData.designQuality === opt ? "text-cyan-400" : "text-white"
                      }`}>{opt}</p>
                      <p className={`mt-1 text-sm ${
                        formData.designQuality === opt ? "text-cyan-400/70" : "text-slate-500"
                      }`}>
                        {opt === "Basic" ? "Essential, clean design" : opt === "Standard" ? "Modern, polished UI" : "Custom premium design"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5 - Description */}
            {step === 5 && (
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">Project Description</h3>
                <p className="mb-6 text-slate-400">Tell us more about your project (optional)</p>
                <Textarea
                  rows={6}
                  placeholder='Example: "I need an e-commerce website with admin panel, payment gateway, inventory management and order tracking."'
                  value={formData.description}
                  onChange={(e) => update("description", e.target.value)}
                  className="w-full rounded-xl border-slate-700 bg-slate-950 text-white placeholder:text-slate-600"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            {step > 1 && (
              <Button variant="ghost" onClick={prev} className="text-slate-400 hover:text-white">
                <ChevronLeft className="mr-1 size-4" /> Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Step {step}/5</span>
            {step < 5 ? (
              <Button
                onClick={next}
                disabled={!canProceed()}
                className="bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-40"
              >
                Next <ChevronRight className="ml-1 size-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 px-6 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Calculating...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="size-4" />
                    Calculate Estimate
                  </span>
                )}
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-300 group-hover:translate-y-0" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostEstimatorForm;
