import { useEffect } from 'react'

/** ¿El foco está en un sitio donde se escribe? Entonces «/» es texto, no el atajo de búsqueda. */
function isTyping(target) {
  return (
    target instanceof HTMLElement && (target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName))
  )
}

/** Abre la búsqueda global con Ctrl/⌘ + K o con «/» (si no hay otra ventana abierta). */
export function useSearchShortcut(onOpen) {
  useEffect(() => {
    const handleKey = (event) => {
      const shortcut = event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)
      const slash = event.key === '/' && !event.metaKey && !event.ctrlKey && !isTyping(event.target)
      if ((shortcut || slash) && !document.querySelector('dialog[open]')) {
        event.preventDefault()
        onOpen()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onOpen])
}
