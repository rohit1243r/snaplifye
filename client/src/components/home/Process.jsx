import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProcessCard from "./ProcessCard";
import { process } from "../../data/process";

function Process() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* Section Background */}
      <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

      <Container>
        <SectionTitle
          subtitle="How We Work"
          title="Our Development Process"
          center
        />

        <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {process.map((item, index) => (
            <ProcessCard key={item.id} item={item} index={index} length={process.length} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Process;
