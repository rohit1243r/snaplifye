import { useEffect, useState } from "react";

import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import PortfolioCard from "./PortfolioCard";

import { getAllProjects } from "@/services/project.service";

function Portfolio() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();

      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="bg-slate-950 py-24">
      <Container>

        <SectionTitle
          subtitle="Portfolio"
          title="Our Recent Projects"
          center
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {projects.length > 0 ? (
            projects.map((project) => (
              <PortfolioCard
                key={project._id}
                project={project}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-400">
              No projects found.
            </p>
          )}

        </div>

      </Container>
    </section>
  );
}

export default Portfolio;