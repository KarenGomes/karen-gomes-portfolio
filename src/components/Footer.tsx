import { Code, Github, Linkedin, Mail } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function Footer() {
  const { isDarkMode } = useTheme()

  return (
    <footer
      className={`py-12 border-t px-6 ${
        isDarkMode ? 'border-[#27272A] bg-[#0A0A0A]' : 'border-zinc-200 bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#7C3AED] rounded-md flex items-center justify-center">
              <Code size={12} className="text-white" />
            </div>
            <span className="font-bold">Karen Gomes</span>
          </div>
          <p className="text-xs opacity-50">© 2026 Built with React, Tailwind &amp; AWS Lambda (DynamoDB)</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <h3 className="text-xl font-bold">Vamos construir algo juntos?</h3>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/karen-sgomes"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl border transition-all hover:bg-[#7C3AED] hover:text-white ${
                isDarkMode ? 'border-[#27272A]' : 'border-zinc-200'
              }`}
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:karen.gomes12023@gmail.com"
              className={`p-3 rounded-xl border transition-all hover:bg-[#7C3AED] hover:text-white ${
                isDarkMode ? 'border-[#27272A]' : 'border-zinc-200'
              }`}
            >
              <Mail size={20} />
            </a>
            <a
              href="https://github.com/KarenGomes"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl border transition-all hover:bg-[#7C3AED] hover:text-white ${
                isDarkMode ? 'border-[#27272A]' : 'border-zinc-200'
              }`}
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className="text-right hidden md:block">
          <p className="text-xs font-bold text-[#7C3AED]">Rio de Janeiro, Brasil</p>
          <p className="text-sm opacity-50 mt-1 italic">
            "Design thinking, code building."
          </p>
        </div>
      </div>
    </footer>
  )
}

