import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import PortfolioCard from "./PortfolioCard";
import { portfolio } from "../../data/portfolio";

function Portfolio() {
  return (
    <section className="bg-slate-950 py-24">
      <Container>

        <SectionTitle
          subtitle="Portfolio"
          title="Our Recent Projects"
          center
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}

export default Portfolio;