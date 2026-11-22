import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

const RULES = ['respect', 'tech', 'help', 'banned', 'practices']

export default function ForumRules({ className }) {
  const { t } = useI18n()

  return (
    <aside aria-labelledby="forum-rules-heading" className={className}>
      <Eyebrow>{t('forum.rules.eyebrow')}</Eyebrow>
      <article
        aria-labelledby="forum-rules-heading"
        className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card"
      >
        <header className="relative isolate overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 pb-6 pt-6 text-white">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full bg-brand-400/30 blur-2xl"
          />
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <Icon name="shield" className="h-5 w-5" />
          </span>
          <h2 id="forum-rules-heading" className="mt-4 text-xl font-bold tracking-tight">
            {t('forum.rules.title')}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-100">{t('forum.rules.intro')}</p>
        </header>
        <ol className="space-y-4 px-6 py-6">
          {RULES.map((rule, index) => (
            <li key={rule} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent"
              >
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">
                <strong className="block font-semibold text-ink">{t(`forum.rules.${rule}Title`)}</strong>
                {t(`forum.rules.${rule}Text`)}
              </p>
            </li>
          ))}
        </ol>
        <p className="mx-6 mb-6 flex items-start gap-2 rounded-2xl bg-accent-soft px-4 py-3 text-sm font-medium text-accent-strong">
          <Icon name="heart" className="mt-0.5 h-4 w-4 shrink-0" />
          {t('forum.rules.footer')}
        </p>
      </article>
    </aside>
  )
}
