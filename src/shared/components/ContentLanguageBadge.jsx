import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

/**
 * Etiqueta «EN» o «ES» para un contenido escrito en un idioma distinto al de la página. Los lectores de pantalla oyen
 * el nombre completo («En inglés»); si el contenido está en el idioma de la página no se muestra nada.
 */
export default function ContentLanguageBadge({ language, className }) {
  const { t, lang } = useI18n()
  if (!language || language === lang) return null
  return (
    <abbr
      title={t(`common.contentLanguage.${language}`)}
      className={cx(
        'inline-flex shrink-0 items-center rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-ink-soft no-underline ring-1 ring-inset ring-slate-200',
        className,
      )}
    >
      <span aria-hidden="true">{language.toUpperCase()}</span>
      <span className="sr-only">{t(`common.contentLanguage.${language}`)}</span>
    </abbr>
  )
}
