import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProcessCard from "./ProcessCard";
import { process } from "../../data/process";

function Process() {
  return (
    <section className="bg-slate-950 py-24">
      <Container>

        <SectionTitle
          subtitle="How We Work"
          title="Our Development Process"
          center
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {process.map((item) => (
            <ProcessCard key={item.id} item={item} />
          ))}
        </div>

      </Container>
    </section>
  );
}

export default Process;