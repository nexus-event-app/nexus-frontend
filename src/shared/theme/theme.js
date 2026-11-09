/** Preferencia de tema: «system» sigue al dispositivo. La clave debe coincidir con public/theme-init.js. */
export const THEME_STORAGE_KEY = 'primercommit.theme'
export const THEMES = ['system', 'light', 'dark']

const DARK_QUERY = '(prefers-color-scheme: dark)'

export function readStoredTheme() {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY)
    return THEMES.includes(value) ? value : 'system'
  } catch {
    return 'system'
  }
}

export function storeTheme(theme) {
  try {
    if (theme === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY)
    else window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Sin almacenamiento (modo privado estricto): el tema se aplica solo en esta visita.
  }
}

export function systemQuery() {
  return window.matchMedia ? window.matchMedia(DARK_QUERY) : null
}

export function resolveTheme(theme) {
  if (theme === 'light' || theme === 'dark') return theme
  return systemQuery()?.matches ? 'dark' : 'light'
}

/** Aplica el tema resuelto a la página: clase .dark en <html> y color de la barra del navegador. */
export function applyTheme(resolved) {
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute('content', resolved === 'dark' ? '#0b1220' : '#4f46e5')
    meta.removeAttribute('media')
  })
}
