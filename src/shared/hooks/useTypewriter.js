import { useEffect, useState } from 'react'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export function useTypewriter(text, { start = true, speed = 55 } = {}) {
  const [length, setLength] = useState(() => (prefersReducedMotion() ? text.length : 0))

  const [previous, setPrevious] = useState(text)
  if (text !== previous) {
    setPrevious(text)
    setLength(prefersReducedMotion() ? text.length : 0)
  }

  useEffect(() => {
    if (!start || length >= text.length) return undefined
    const timer = window.setTimeout(() => setLength((current) => current + 1), speed)
    return () => window.clearTimeout(timer)
  }, [start, length, text, speed])

  return { typed: text.slice(0, length), done: length >= text.length }
}
