import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './theme-context'

const STORAGE_KEY = 'karen.dev.theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark') setIsDarkMode(true)
      if (stored === 'light') setIsDarkMode(false)
    } catch {
      void 0
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isDarkMode ? 'dark' : 'light')
    } catch {
      void 0
    }
  }, [isDarkMode])

  const toggle = useCallback(() => setIsDarkMode((v) => !v), [])
  const setDarkMode = useCallback((value: boolean) => setIsDarkMode(value), [])

  const value = useMemo(() => ({ isDarkMode, toggle, setDarkMode }), [isDarkMode, toggle, setDarkMode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
