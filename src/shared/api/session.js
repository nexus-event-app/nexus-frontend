const STORAGE_KEY = 'primercommit.session'

const listeners = new Set()

function readStorage() {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export const SESSION_STORAGE_KEY = STORAGE_KEY

function parseSession(raw) {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.token === 'string' && parsed.user && typeof parsed.user === 'object') {
      return { token: parsed.token, user: parsed.user }
    }
  } catch {
    return null
  }
  return null
}

export function readSession() {
  return parseSession(readStorage())
}

export function getToken() {
  return readSession()?.token ?? null
}

export function saveSession(session) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    return
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}

export function onUnauthorized(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function notifyUnauthorized() {
  listeners.forEach((listener) => listener())
}
