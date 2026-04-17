import { Cpu, Globe, Layers, Server, Terminal } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function TechStack() {
  const { isDarkMode } = useTheme()

  return (
    <div
      className={`border-y py-8 ${
        isDarkMode ? 'bg-[#0F0F0F] border-[#27272A]' : 'bg-white border-[#E5E7EB]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#7C3AED] mb-6">
          Expertise em Tecnologias
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
          <div className="flex items-center gap-2">
            <Layers size={20} /> <span className="font-bold">Angular</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers size={20} /> <span className="font-bold">React</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={20} /> <span className="font-bold">Node.js</span>
          </div>
          <div className="flex items-center gap-2">
            <Server size={20} /> <span className="font-bold">Spring Boot</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={20} /> <span className="font-bold">Flutter</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal size={20} /> <span className="font-bold">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  )
}

