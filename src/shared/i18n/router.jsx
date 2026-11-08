import { Link as RouterLink, NavLink as RouterNavLink, Navigate as RouterNavigate } from 'react-router-dom'
import { localizeTo } from './languages'
import { useI18n } from './useI18n'

/** Igual que el Link de react-router, pero conserva el idioma de la página en la que estás. */
export function Link({ to, ...props }) {
  const { lang } = useI18n()
  return <RouterLink to={localizeTo(to, lang)} {...props} />
}

export function NavLink({ to, ...props }) {
  const { lang } = useI18n()
  return <RouterNavLink to={localizeTo(to, lang)} {...props} />
}

export function Navigate({ to, ...props }) {
  const { lang } = useI18n()
  return <RouterNavigate to={localizeTo(to, lang)} {...props} />
}
