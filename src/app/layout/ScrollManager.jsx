import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollManager() {
  const { pathname, search, hash } = useLocation()
  const page = new URLSearchParams(search).get('page')
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      document.getElementById('contenido')?.focus({ preventScroll: true })
    }
  }, [pathname, page, hash])

  return null
}
