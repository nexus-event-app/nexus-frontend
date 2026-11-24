import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { countPageView } from './pageViews'

const TITLE_DELAY = 600

export default function PageViewTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    const timer = window.setTimeout(() => countPageView(pathname), TITLE_DELAY)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return null
}
