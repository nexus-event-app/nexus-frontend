import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { focusMainContent } from '@/shared/navigation/pageFocus'

/** Cuántas veces (y cada cuánto) se busca el destino de un ancla: la página nueva puede tardar un poco en pintarse. */
const ANCHOR_TRIES = 20
const ANCHOR_INTERVAL = 50

/**
 * Al cambiar de página sube al principio y lleva el foco al contenido. Si la dirección trae un ancla (#apartado), baja
 * hasta ese apartado en cuanto existe, como haría el navegador en una web de páginas sueltas.
 */
export default function ScrollManager() {
  const { pathname, search, hash } = useLocation()
  const page = new URLSearchParams(search).get('page')
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (hash) {
      previousPath.current = pathname
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      const timer = window.setInterval(() => {
        const target = document.getElementById(id)
        tries += 1
        if (target) {
          const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
          target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        }
        if (target || tries >= ANCHOR_TRIES) window.clearInterval(timer)
      }, ANCHOR_INTERVAL)
      return () => window.clearInterval(timer)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      focusMainContent()
    }
  }, [pathname, page, hash])

  return null
}
