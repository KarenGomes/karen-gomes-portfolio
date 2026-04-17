import { createContext } from 'react'

export type ThemeContextValue = {
  isDarkMode: boolean
  toggle: () => void
  setDarkMode: (value: boolean) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
