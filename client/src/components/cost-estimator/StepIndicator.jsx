import { motion } from "framer-motion";

const steps = [
  { num: 1, label: "Website Type" },
  { num: 2, label: "Pages" },
  { num: 3, label: "Features" },
  { num: 4, label: "Design" },
  { num: 5, label: "Details" },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: currentStep === step.num ? 1 : 0.85,
                  backgroundColor:
                    currentStep >= step.num ? "#06b6d4" : "rgb(30 41 59)",
                }}
                transition={{ duration: 0.3 }}
                className={`flex size-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  currentStep >= step.num
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {currentStep > step.num ? "✓" : step.num}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium transition-colors ${
                  currentStep >= step.num ? "text-cyan-400" : "text-slate-600"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-2 mt-[-1.5rem] h-0.5 w-8 sm:w-16 md:w-24">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 rounded-full bg-slate-800" />
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{
                      width: currentStep > step.num ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepIndicator;
