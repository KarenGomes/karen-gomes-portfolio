import { Code, Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function Navbar() {
  const { isDarkMode, toggle } = useTheme()

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b backdrop-blur-md ${
        isDarkMode
          ? 'border-[#27272A] bg-[#0A0A0A]/80'
          : 'border-[#E5E7EB] bg-[#F9FAFB]/80'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
            <Code size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:block">Karen.dev</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-[#7C3AED] transition-colors">
              Sobre
            </a>
            <a
              href="#projects"
              className="hover:text-[#7C3AED] transition-colors"
            >
              Projetos
            </a>
            <a
              href="#experience"
              className="hover:text-[#7C3AED] transition-colors"
            >
              Experiência
            </a>
          </div>

          <div className="flex items-center gap-3 border-l pl-6 border-zinc-700">
            <button
              onClick={toggle}
              className={`p-2 rounded-full transition-all ${
                isDarkMode
                  ? 'hover:bg-zinc-800 text-yellow-400'
                  : 'hover:bg-zinc-200 text-purple-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

