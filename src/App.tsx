import { ExperienceTimeline } from './components/ExperienceTimeline'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ProjectGrid } from './components/ProjectGrid'
import { TechStack } from './components/TechStack'
import { usePortfolioData } from './hooks/usePortfolioData'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { isDarkMode } = useTheme()
  const { data } = usePortfolioData()

  const themeClasses = isDarkMode ? 'bg-[#0A0A0A] text-[#EDEDED]' : 'bg-[#F9FAFB] text-[#111827]'

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${themeClasses}`}>
      <Navbar />

      <Hero />
      <TechStack />

      <ProjectGrid projects={data?.projects ?? []} />
      <ExperienceTimeline experiences={data?.experiences ?? []} />

      <Footer />
    </div>
  )
}
