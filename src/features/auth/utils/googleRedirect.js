import { safeRedirect } from '@/shared/utils/url'

/** Al ir a Google se recuerda adónde volver (p. ej. la oferta que iba a guardar), solo en esta pestaña. */
const KEY = 'primercommit.googleRedirect'

export function rememberGoogleRedirect(path) {
  try {
    sessionStorage.setItem(KEY, path)
  } catch {
    // Sin almacenamiento (modo privado estricto): se volverá a la portada.
  }
}

/** Devuelve la ruta guardada (solo rutas internas) y la olvida. */
export function takeGoogleRedirect(fallback) {
  let stored = null
  try {
    stored = sessionStorage.getItem(KEY)
    sessionStorage.removeItem(KEY)
  } catch {
    stored = null
  }
  return safeRedirect(stored, fallback)
}
