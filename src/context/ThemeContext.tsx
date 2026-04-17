import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

type ThemeContextValue = {
  isDarkMode: boolean
  toggle: () => void
  setDarkMode: (value: boolean) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'karen.dev.theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark') setIsDarkMode(true)
      if (stored === 'light') setIsDarkMode(false)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isDarkMode ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [isDarkMode])

  const toggle = useCallback(() => setIsDarkMode((v) => !v), [])
  const setDarkMode = useCallback((value: boolean) => setIsDarkMode(value), [])

  const value = useMemo(() => ({ isDarkMode, toggle, setDarkMode }), [isDarkMode, toggle, setDarkMode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

