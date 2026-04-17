import { useEffect, useRef, useState } from 'react'
import type { Experience } from '../models/portfolio'

export function ExperienceItem({
  exp,
  index,
  isDarkMode,
}: {
  exp: Experience
  index: number
  isDarkMode: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.1 },
    )

    const currentRef = domRef.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  return (
    <div
      ref={domRef}
      className={`relative pl-8 md:pl-0 transition-all duration-1000 delay-[${index * 200}ms] transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="md:grid md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4 md:text-right">
          <p className="text-sm font-bold text-[#7C3AED]">{exp.period}</p>
          <h3 className="text-lg font-bold">{exp.company}</h3>
        </div>

        <div className="hidden md:flex md:col-span-1 justify-center relative">
          <div
            className={`w-0.5 h-full ${
              isDarkMode ? 'bg-[#27272A]' : 'bg-zinc-200'
            }`}
          ></div>
          <div
            className={`absolute top-1 w-4 h-4 rounded-full border-4 bg-[#7C3AED] transition-transform duration-500 ${
              isVisible ? 'scale-100' : 'scale-0'
            } ${isDarkMode ? 'border-[#0A0A0A]' : 'border-white'}`}
          ></div>
        </div>

        <div className="md:col-span-7 space-y-2">
          <h4 className="text-xl font-bold">{exp.role}</h4>
          <p className="text-sm opacity-70 leading-relaxed">{exp.description}</p>
        </div>
      </div>
    </div>
  )
}

