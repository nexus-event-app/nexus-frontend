import { Link as RouterLink, useLocation } from 'react-router-dom'
import { LANGUAGES, LANGUAGE_META, localizePath } from '@/shared/i18n/languages'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

/** Cambia de idioma manteniendo la página, los filtros y la paginación. */
export default function LanguageSwitcher({ className }) {
  const { t, lang } = useI18n()
  const { pathname, search, hash } = useLocation()

  return (
    <nav aria-label={t('common.language.label')} className={className}>
      <ul className="flex items-center gap-1">
        {LANGUAGES.map((language) => {
          const active = language === lang
          return (
            <li key={language}>
              <RouterLink
                to={`${localizePath(pathname, language)}${search}${hash}`}
                lang={language}
                hrefLang={language}
                aria-current={active ? 'true' : undefined}
                title={LANGUAGE_META[language].name}
                className={cx(
                  'inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center rounded-control px-2 text-sm font-bold transition-colors sm:min-h-[2.25rem] sm:min-w-[2.25rem]',
                  active ? 'bg-accent-soft text-accent-strong' : 'text-ink-muted hover:bg-slate-100 hover:text-ink',
                )}
              >
                {LANGUAGE_META[language].short}
              </RouterLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
