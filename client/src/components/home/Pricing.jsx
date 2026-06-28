import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import PricingCard from "./PricingCard";
import { pricingPlans } from "../../data/pricing";

function Pricing() {
  return (
    <section className="bg-slate-950 py-24">
      <Container>
        <SectionTitle
          subtitle="Pricing"
          title="Choose Your Perfect Plan"
          center
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Pricing;