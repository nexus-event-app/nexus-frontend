import { safeRedirect } from '@/shared/utils/url'

const KEY = 'primercommit.googleRedirect'

export function rememberGoogleRedirect(path) {
  try {
    sessionStorage.setItem(KEY, path)
  } catch {}
}

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
