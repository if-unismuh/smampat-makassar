"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // Start with the default theme
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)

  // This state tracks if we're mounted on the client
  const [mounted, setMounted] = React.useState(false)

  // Only run this effect on the client side
  React.useEffect(() => {
    setMounted(true)

    // Now it's safe to access localStorage
    const storedTheme = localStorage.getItem(storageKey) as Theme
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [storageKey])

  // Apply theme class to document
  React.useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, mounted])

  // Safe theme setter that only runs on client
  const setThemeSafely = React.useCallback(
    (theme: Theme) => {
      if (mounted) {
        localStorage.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
    [storageKey, mounted],
  )

  // Provide the theme context value
  const value = {
    theme,
    setTheme: setThemeSafely,
  }

  // Prevent flash by not rendering anything until mounted
  // Or render with default theme if we're on server
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
