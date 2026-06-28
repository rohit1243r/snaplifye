import { ArrowUpRight, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function PortfolioCard({ project }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)]">

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
          {project.category}
        </span>

        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-sm text-yellow-400 backdrop-blur">
          <Star className="h-4 w-4 fill-yellow-400" />
          {project.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white">
          {project.title}
        </h3>

        <p className="mt-3 text-3xl font-bold text-cyan-400">
          {project.price}
        </p>

        {/* Features */}
        <div className="mt-5 space-y-2">
          {project.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-slate-300"
            >
              <Check className="h-4 w-4 text-cyan-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          <Button asChild className="flex-1">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            className="flex-1"
          >
            Customize
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;