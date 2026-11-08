import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { I18nContext } from './context'
import { LANGUAGE_META, langFromPath } from './languages'
import { setCurrentLanguage, translate } from './translate'

export default function I18nProvider({ children }) {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)

  // Se fija durante el render para que los hijos y el código fuera de React ya vean el idioma correcto.
  setCurrentLanguage(lang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      locale: LANGUAGE_META[lang].locale,
      t: (key, params) => translate(key, params, lang),
    }),
    [lang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
