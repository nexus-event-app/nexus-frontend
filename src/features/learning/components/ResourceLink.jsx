import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

/** Enlace a un recurso externo gratuito: dice quién lo publica, en qué idioma está y que se abre en otra pestaña. */
export default function ResourceLink({ resource }) {
  const { t } = useI18n()
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-[2.75rem] items-start gap-3 rounded-control border border-slate-200 p-3 hover:border-accent-line hover:bg-accent-soft/40"
    >
      <Icon name="external" className="mt-0.5 h-5 w-5 text-ink-muted group-hover:text-accent" />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink group-hover:text-accent">{resource.name}</span>
        <span className="block text-sm text-ink-muted">{resource.provider}</span>
      </span>
      <abbr
        title={t(`learning.detail.languageSr.${resource.lang}`)}
        className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-ink-soft no-underline"
      >
        <span aria-hidden="true">{t(`learning.detail.language.${resource.lang}`)}</span>
        <span className="sr-only">{t(`learning.detail.languageSr.${resource.lang}`)}</span>
      </abbr>
      <span className="sr-only">({t('learning.detail.newTab')})</span>
    </a>
  )
}
