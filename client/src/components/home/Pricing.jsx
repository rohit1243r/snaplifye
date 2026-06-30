import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import PricingCard from "./PricingCard";
import { pricingPlans } from "../../data/pricing";

function Pricing() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* Background */}
      <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/5 blur-[120px]" />

      <Container>
        <SectionTitle
          subtitle="Pricing"
          title="Choose Your Perfect Plan"
          center
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Pricing;
