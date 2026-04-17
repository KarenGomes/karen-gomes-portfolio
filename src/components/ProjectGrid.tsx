import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import type { Project, ProjectCategory } from '../models/portfolio'
import { ProjectCard } from './ProjectCard'

const FILTERS: ProjectCategory[] = [
  'Todos',
  'Fullstack',
  'Web',
  'Mobile',
  'UX/UI',
  'Ferramentas',
]

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const { isDarkMode } = useTheme()
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 4

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  const filteredProjects = useMemo(() => {
    return activeFilter === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeFilter)
  }, [activeFilter, projects])

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  )

  const cardClasses = isDarkMode
    ? 'bg-[#161618] border-[#27272A] hover:border-[#7C3AED]'
    : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#6D28D9] shadow-sm'

  return (
    <section id="projects" className="py-24 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Projetos em Destaque</h2>
            <p className="text-[#A1A1AA] max-w-lg">
              Soluções end-to-end com foco em performance técnica e experiência
              visual refinada.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                  activeFilter === filter
                    ? 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/20'
                    : `${
                        isDarkMode
                          ? 'bg-[#161618] border-[#27272A] text-zinc-400'
                          : 'bg-white border-zinc-200 text-zinc-600'
                      } hover:border-[#7C3AED]`
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 min-h-[600px] content-start">
          {currentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              cardClasses={cardClasses}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-all ${
                currentPage === 1
                  ? 'opacity-30 cursor-not-allowed'
                  : `hover:bg-[#7C3AED] hover:text-white ${
                      isDarkMode ? 'border-[#27272A]' : 'border-zinc-200'
                    }`
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-all border ${
                    currentPage === i + 1
                      ? 'bg-[#7C3AED] border-[#7C3AED] text-white'
                      : `${
                          isDarkMode
                            ? 'border-[#27272A] hover:border-[#7C3AED]'
                            : 'border-zinc-200 hover:border-[#7C3AED]'
                        }`
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-all ${
                currentPage === totalPages
                  ? 'opacity-30 cursor-not-allowed'
                  : `hover:bg-[#7C3AED] hover:text-white ${
                      isDarkMode ? 'border-[#27272A]' : 'border-zinc-200'
                    }`
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

