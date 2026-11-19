import Eyebrow from '@/shared/components/Eyebrow'
import Illustration from '@/shared/components/Illustration'
import { illustrations } from '@/shared/config/illustrations'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

/** Cuatro tarjetas con tres consejos cada una. Los textos están en jobs.tips (castellano, catalán e inglés). */
const CARDS = [
  { id: 'linkedin', icon: 'briefcase' },
  { id: 'visible', icon: 'sparkles' },
  { id: 'cv', icon: 'document' },
  { id: 'letter', icon: 'pencil' },
]

/**
 * Guía rápida después de los portales: lo más importante para tener LinkedIn al día, hacerse visible, preparar el
 * CV y la carta de presentación. Breve, como ayuda para quien empieza, sin entrar en detalle.
 */
export default function JobTips() {
  const { t } = useI18n()

  return (
    <section aria-labelledby="job-tips" className="relative mt-20">
      <hgroup className="max-w-2xl">
        <Eyebrow>{t('jobs.tips.eyebrow')}</Eyebrow>
        <h2 id="job-tips" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('jobs.tips.title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('jobs.tips.description')}</p>
      </hgroup>
      {/* En el hueco libre a la derecha del título: colocada encima, sin ocupar sitio ni mover las tarjetas. */}
      <Illustration
        {...illustrations.tips}
        className="absolute -top-8 right-6 hidden w-44 lg:block xl:right-12 xl:w-48"
      />
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {CARDS.map((card) => (
          <li key={card.id}>
            <article
              aria-labelledby={`job-tips-${card.id}`}
              className="h-full rounded-3xl border border-slate-200 bg-surface p-6 shadow-card transition-shadow duration-300 hover:shadow-pop sm:p-8"
            >
              <header className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent"
                >
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 id={`job-tips-${card.id}`} className="text-xl font-bold text-ink">
                  {t(`jobs.tips.${card.id}Title`)}
                </h3>
              </header>
              <ul className="mt-6 space-y-5">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                    <Icon name="check" className="mt-0.5 h-5 w-5 text-accent" />
                    <p className="leading-relaxed text-ink-soft">
                      <strong className="block font-semibold text-ink">{t(`jobs.tips.${card.id}${n}Title`)}</strong>
                      {t(`jobs.tips.${card.id}${n}Text`)}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
