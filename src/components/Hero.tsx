import { Download, Github } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useTypewriter } from '../hooks/useTypewriter'
import { Button } from './ui/Button'
import karenIcon from '../assets/images/karen-icon.png'
import cvPdf from '../assets/docs/Karen Gomes - Analista e Desenvolvedora De Sistemas.pdf'

const FULL_TEXT =
  'Sou desenvolvedora Full Stack Júnior e UI/UX designer. Especialista em Angular, Flutter, React e integração de IA Generativa em produtos digitais.'

export function Hero() {
  const { isDarkMode } = useTheme()
  const typedText = useTypewriter(FULL_TEXT, 40)

  return (
    <section id="about" className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight pt-4">
              Engenharia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#C084FC]">
                &amp; Design Digital
              </span>
            </h1>
          </div>

          <div
            className={`rounded-xl border font-mono text-sm overflow-hidden shadow-2xl ${
              isDarkMode
                ? 'bg-black border-[#27272A]'
                : 'bg-zinc-900 border-zinc-800 text-white'
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs opacity-50">
                bash — karen_bio.sh
              </span>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-purple-400">~/profile</span>
                <span>cat introduction.txt</span>
              </div>
              <p className="leading-relaxed">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
              <div className="flex gap-4 pt-4">
                <a
                  href={cvPdf}
                  download="Karen_Gomes_CV.pdf"
                  className="inline-flex"
                  aria-label="Baixar currículo em PDF"
                >
                  <Button className="px-5 py-2.5" type="button">
                    <Download size={16} />
                    Download CV
                  </Button>
                </a>

                <a
                  href="https://github.com/KarenGomes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-zinc-700 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
                >
                  <Github size={16} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <div className="absolute inset-0 bg-[#7C3AED] blur-[80px] opacity-20 animate-pulse"></div>
            <div
              className={`absolute inset-0 border-2 rounded-3xl transform rotate-3 transition-transform hover:rotate-0 duration-500 ${
                isDarkMode ? 'border-[#7C3AED]/30' : 'border-purple-200'
              }`}
            ></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#C084FC] p-[3px] rounded-3xl"></div>
              <div
                className={`relative w-full h-full rounded-3xl overflow-hidden border-4 ${
                  isDarkMode ? 'border-[#0A0A0A]' : 'border-white'
                }`}
              >
                <img
                  src={karenIcon}
                  alt="Foto de Karen Gomes"
                  className="w-full h-full object-cover object-center scale-[1.03] transition-transform duration-500 hover:scale-[1.06]"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

