import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '../models/portfolio'

export function ProjectCard({
  project,
  cardClasses,
}: {
  project: Project
  cardClasses: string
}) {
  return (
    <div
      className={`group rounded-2xl border p-2 transition-all duration-500 overflow-hidden h-fit ${cardClasses}`}
    >
      <div className="relative h-56 rounded-xl overflow-hidden mb-4 bg-zinc-800">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <div className="flex gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white text-black rounded-lg hover:bg-[#7C3AED] hover:text-white transition-colors"
              >
                <Github size={18} />
              </a>
            ) : (
              <div
                className="p-2 bg-white/20 text-white/40 rounded-lg cursor-not-allowed"
                title="Repositório Privado/Não disponível"
              >
                <Github size={18} />
              </div>
            )}

            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white text-black rounded-lg hover:bg-[#7C3AED] hover:text-white transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            ) : (
              <div
                className="p-2 bg-white/20 text-white/40 rounded-lg cursor-not-allowed"
                title="Live demo indisponível"
              >
                <ExternalLink size={18} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className="text-[10px] font-black uppercase tracking-tighter bg-[#7C3AED]/10 text-[#7C3AED] px-2 py-1 rounded">
            {project.category}
          </span>
        </div>
        <p className="text-sm opacity-70">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium opacity-50 px-2 py-0.5 rounded border border-current"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

