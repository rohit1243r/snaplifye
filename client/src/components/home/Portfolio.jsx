import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* Background */}
      <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-[120px]" />

      <Container>
        <SectionTitle
          subtitle="Portfolio"
          title="Our Recent Projects"
          center
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
              >
                <PortfolioCard project={project} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-slate-400">
              No projects found.
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

export default Portfolio;
