import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import useQuoteDialog from "@/hooks/useQuoteDialog";

function PricingCard({ plan, index }) {
  const { open } = useQuoteDialog();

  return (
    <div
      className={`group relative rounded-2xl border p-8 transition-all duration-500 ${
        plan.popular
          ? "border-cyan-500 bg-slate-900 shadow-[0_0_50px_rgba(6,182,212,0.2)] hover:shadow-[0_0_60px_rgba(6,182,212,0.3)]"
          : "border-slate-800 bg-slate-900 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5"
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-1.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30">
            <Sparkles size={14} />
            Most Popular
          </span>
        </div>
      )}

      {/* Plan Name */}
      <h3 className={`text-2xl font-bold ${plan.popular ? "text-white" : "text-white"}`}>
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-5xl font-bold text-cyan-400">{plan.price}</span>
        {plan.price !== "Custom" && (
          <span className="text-sm text-slate-500">/project</span>
        )}
      </div>

      {/* Features */}
      <div className="mt-8 space-y-4">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
              plan.popular ? "bg-cyan-500/20" : "bg-slate-800"
            }`}>
              <Check className={`size-4 ${
                plan.popular ? "text-cyan-400" : "text-slate-400"
              }`} />
            </div>
            <span className="text-slate-300">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Button
        onClick={open}
        className={`mt-8 w-full transition-all duration-300 ${
          plan.popular
            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-95"
            : "bg-slate-800 text-white hover:bg-slate-700 hover:scale-[1.02] active:scale-95"
        }`}
      >
        Get Started
      </Button>
    </div>
  );
}

export default PricingCard;
