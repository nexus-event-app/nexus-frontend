import { useEffect, useRef } from 'react'

export function useDismiss(ref, active, onDismiss) {
  const onDismissRef = useRef(onDismiss)

  useEffect(() => {
    onDismissRef.current = onDismiss
  })

  useEffect(() => {
    if (!active) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onDismissRef.current()
    }
    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onDismissRef.current()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [ref, active])
}
