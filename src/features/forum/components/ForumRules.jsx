import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

const RULES = ['respect', 'tech', 'help', 'banned', 'practices']

/**
 * Normas del foro, al lado de las discusiones y del formulario para abrir una. Antetítulo y título fuera, como con la
 * introducción, en el resto de la web; en el recuadro, las normas numeradas, porque se leen de arriba abajo.
 */
export default function ForumRules({ className }) {
  const { t } = useI18n()

  return (
    <aside aria-labelledby="forum-rules-heading" className={className}>
      <hgroup>
        <Eyebrow>{t('forum.rules.eyebrow')}</Eyebrow>
        <h2 id="forum-rules-heading" className="mt-3 text-2xl font-bold tracking-tight text-ink">
          {t('forum.rules.title')}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t('forum.rules.intro')}</p>
      </hgroup>
      <ol className="mt-5 space-y-4 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
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
      <p className="mt-4 flex items-start gap-2 rounded-2xl bg-accent-soft px-4 py-3 text-sm font-medium text-accent-strong">
        <Icon name="heart" className="mt-0.5 h-4 w-4 shrink-0" />
        {t('forum.rules.footer')}
      </p>
    </aside>
  )
}
