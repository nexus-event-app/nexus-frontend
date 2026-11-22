import { useEffect } from 'react'

function isTyping(target) {
  return (
    target instanceof HTMLElement && (target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName))
  )
}

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
