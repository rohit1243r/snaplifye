import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ServiceCard from "./ServiceCard";
import { services } from "../../data/services";

function Services() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* Section Background Glow */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

      <Container>
        <SectionTitle
          subtitle="Our Services"
          title="Everything You Need to Build Your Online Presence"
          center
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Services;
