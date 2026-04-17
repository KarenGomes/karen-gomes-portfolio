import type { Experience } from '../models/portfolio'
import { useTheme } from '../hooks/useTheme'
import { ExperienceItem } from './ExperienceItem'

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  const { isDarkMode } = useTheme()

  return (
    <section
      id="experience"
      className={`py-24 px-6 ${isDarkMode ? 'bg-[#0F0F0F]' : 'bg-zinc-50'}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">
          Experiência Profissional
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id || index}
              exp={exp}
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

