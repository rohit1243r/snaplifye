import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ServiceCard from "./ServiceCard";
import { services } from "../../data/services";

function Services() {
  return (
    <section className="bg-slate-950 py-24">
      <Container>
        <SectionTitle
          subtitle="Our Services"
          title="Everything You Need to Build Your Online Presence"
          center
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Services;