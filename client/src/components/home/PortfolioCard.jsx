import { ArrowUpRight, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function PortfolioCard({ project }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_20px_60px_rgba(6,182,212,.15)]">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={
            project.image ||
            "https://placehold.co/600x400?text=Project"
          }
          alt={project.title}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
          {project.category}
        </span>
        {project.featured && (
          <div className="absolute right-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white">
          {project.title}
        </h3>
        <p className="mt-4 text-slate-400">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies?.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-slate-800 px-3 py-1 text-sm text-cyan-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons - Best UI Version */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {project.demoUrl && (
            <Button
              asChild
              className="bg-cyan-500 text-white hover:bg-cyan-600"
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}

          {project.githubUrl && (
            <Button
              asChild
              className="bg-slate-800 text-white hover:bg-slate-700"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;