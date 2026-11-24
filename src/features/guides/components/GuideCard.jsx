import { Link } from '@/shared/i18n/router'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import { categoryOf } from '../config/categories'

export default function GuideCard({ guide, headingLevel = 'h2' }) {
  const Heading = headingLevel
  const { t } = useI18n()
  const category = categoryOf(guide.category)
  return (
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-line hover:shadow-pop">
      <header className="flex items-center gap-3 bg-gradient-to-r from-brand-600 via-brand-700 to-violet-700 px-5 py-3 text-white">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-white">
          <Icon name={category.icon} className="h-4 w-4" />
          {t(`guides.categories.${category.value}`)}
        </span>
      </header>

      <section className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-sm text-ink-muted">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gradient-to-br from-brand-500 to-violet-500" />
          <Time value={guide.publishedAt} />
        </p>
        <Heading lang={guide.language} className="mt-3 text-xl font-bold leading-snug text-ink">
          <Link
            to={paths.guideDetail(guide)}
            className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] group-hover:text-accent"
          >
            {guide.title}
          </Link>
        </Heading>
        <p lang={guide.language} className="mt-3 leading-relaxed text-ink-muted">
          {guide.description}
        </p>
        <p
          aria-hidden="true"
          className="pointer-events-none mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent"
        >
          {t('guides.read')}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </p>
      </section>
    </article>
  )
}
