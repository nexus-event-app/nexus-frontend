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
      className="group grid h-full min-h-[2.75rem] grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 rounded-2xl border border-slate-200 bg-canvas p-3.5 transition-all hover:-translate-y-0.5 hover:border-accent-line hover:bg-surface hover:shadow-card"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-ink-muted ring-1 ring-inset ring-slate-200 transition-colors group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600"
      >
        <Icon name="external" className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold leading-snug text-ink group-hover:text-accent">{resource.name}</span>
        <span className="mt-0.5 block text-sm text-ink-muted">{resource.provider}</span>
      </span>
      <abbr
        title={t(`learning.detail.languageSr.${resource.lang}`)}
        className="rounded bg-surface px-1.5 py-0.5 text-xs font-bold text-ink-soft no-underline ring-1 ring-inset ring-slate-200"
      >
        <span aria-hidden="true">{t(`learning.detail.language.${resource.lang}`)}</span>
        <span className="sr-only">{t(`learning.detail.languageSr.${resource.lang}`)}</span>
      </abbr>
      <span className="sr-only">({t('learning.detail.newTab')})</span>
    </a>
  )
}
