import { useCallback } from 'react'
import { useNavigate as useRouterNavigate } from 'react-router-dom'
import { localizeTo } from './languages'
import { useI18n } from './useI18n'

/** Igual que useNavigate de react-router, pero conserva el idioma de la página en la que estás. */
export function useNavigate() {
  const navigate = useRouterNavigate()
  const { lang } = useI18n()
  return useCallback(
    (to, options) => navigate(typeof to === 'number' ? to : localizeTo(to, lang), options),
    [navigate, lang],
  )
}
