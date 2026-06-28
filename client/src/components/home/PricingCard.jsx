import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function PricingCard({ plan }) {
  return (
    <div
      className={`relative rounded-2xl border p-8 transition-all duration-300 ${
        plan.popular
          ? "border-cyan-500 bg-slate-900 shadow-[0_0_40px_rgba(6,182,212,0.2)]"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-4 py-1 text-sm font-semibold text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-2xl font-bold text-white">
        {plan.name}
      </h3>

      <p className="mt-4 text-4xl font-bold text-cyan-400">
        {plan.price}
      </p>

      <div className="mt-8 space-y-4">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-cyan-400" />
            <span className="text-slate-300">{feature}</span>
          </div>
        ))}
      </div>

      <Button className="mt-8 w-full">
        Get Started
      </Button>
    </div>
  );
}

export default PricingCard;