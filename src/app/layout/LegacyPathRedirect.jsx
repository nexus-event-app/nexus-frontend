import { Navigate, useLocation } from 'react-router-dom'
import { langFromPath, localizePath } from '@/shared/i18n/languages'

export default function LegacyPathRedirect() {
  const { pathname, search, hash } = useLocation()
  const target = localizePath(pathname, langFromPath(pathname))
  return <Navigate to={`${target}${search}${hash}`} replace />
}
