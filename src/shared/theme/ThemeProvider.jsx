import { useCallback, useEffect, useMemo, useState } from 'react'
import { applyTheme, readStoredTheme, resolveTheme, storeTheme, systemQuery, THEMES } from './theme'
import { ThemeContext } from './themeContext'

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStoredTheme)
  const [resolved, setResolved] = useState(() => resolveTheme(readStoredTheme()))

  useEffect(() => {
    const update = () => {
      const next = resolveTheme(theme)
      setResolved(next)
      applyTheme(next)
    }
    update()
    if (theme !== 'system') return undefined
    const query = systemQuery()
    query?.addEventListener('change', update)
    return () => query?.removeEventListener('change', update)
  }, [theme])

  useEffect(() => {
    const handleStorage = () => setThemeState(readStoredTheme())
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const setTheme = useCallback((next) => {
    if (!THEMES.includes(next)) return
    storeTheme(next)
    setThemeState(next)
  }, [])

  const value = useMemo(() => ({ theme, resolved, setTheme }), [theme, resolved, setTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
