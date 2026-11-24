const PRIVATE_SEGMENTS = ['perfil', 'profile']

export function goatCounterEndpoint(code = import.meta.env.VITE_GOATCOUNTER_CODE) {
  const clean = (code ?? '').trim()
  return /^[a-z0-9-]+$/i.test(clean) ? `https://${clean}.goatcounter.com/count` : null
}

export function anonymousPath(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  const index = parts.findIndex((part) => PRIVATE_SEGMENTS.includes(part))
  if (index === -1) return pathname || '/'
  return `/${parts.slice(0, index + 1).join('/')}`
}

export function shouldCount({ hostname, webdriver }) {
  return !webdriver && hostname !== 'localhost' && hostname !== '127.0.0.1'
}

export function pageViewUrl(endpoint, { path, title, referrer, screenWidth }) {
  const params = new URLSearchParams({ p: path, t: title, s: String(screenWidth), rnd: Math.random().toString(36) })
  if (referrer) params.set('r', referrer)
  return `${endpoint}?${params}`
}

function externalReferrer() {
  try {
    const referrer = document.referrer && new URL(document.referrer)
    return referrer && referrer.hostname !== window.location.hostname ? referrer.origin : ''
  } catch {
    return ''
  }
}

let firstView = true

export function countPageView(pathname, endpoint = goatCounterEndpoint()) {
  if (!endpoint || !shouldCount({ hostname: window.location.hostname, webdriver: navigator.webdriver })) return false
  const referrer = firstView ? externalReferrer() : ''
  firstView = false
  const image = new Image()
  image.referrerPolicy = 'no-referrer'
  image.src = pageViewUrl(endpoint, {
    path: anonymousPath(pathname),
    title: document.title,
    referrer,
    screenWidth: window.screen?.width ?? 0,
  })
  return true
}
