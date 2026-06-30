import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function PortfolioCard({ project }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_20px_60px_rgba(6,182,212,.15)]">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image || "https://placehold.co/600x400?text=Project"}
          alt={project.title}
          className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          {project.category}
        </span>
        {project.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-black shadow-lg">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-slate-400">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies?.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-400"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {project.demoUrl && (
            <Button
              asChild
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 active:scale-95"
            >
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <span className="relative z-10 flex items-center">
                  <ArrowUpRight className="mr-1 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Live Demo
                </span>
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-300 group-hover:translate-y-0" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              asChild
              className="group relative overflow-hidden border border-slate-600 bg-slate-800/50 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-95"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <span className="relative z-10 flex items-center">
                  <FaGithub className="mr-1 size-4 transition-transform duration-300 group-hover:scale-110" />
                  GitHub
                </span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-slate-700 to-slate-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;
