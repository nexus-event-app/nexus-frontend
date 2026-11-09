import { Navigate, useLocation } from 'react-router-dom'
import { langFromPath, localizePath } from '@/shared/i18n/languages'

/**
 * Redirige direcciones antiguas con la sección en castellano dentro de otro idioma («/en/foro/12-x») a su versión
 * traducida («/en/forum/12-x»), conservando la búsqueda y el ancla, para que ningún enlace compartido se rompa.
 */
export default function LegacyPathRedirect() {
  const { pathname, search, hash } = useLocation()
  const target = localizePath(pathname, langFromPath(pathname))
  return <Navigate to={`${target}${search}${hash}`} replace />
}
