import { Link } from '@/shared/i18n/router'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { cx } from '@/shared/utils/classNames'
import { useI18n } from '@/shared/i18n/useI18n'
import { FEATURED_TERMS, termPath } from '../data/glossary'
import MissingWordCallout from './MissingWordCallout'

/**
 * Bloque de Rutas de aprendizaje que lleva al glosario: antetítulo y título fuera, y en el recuadro unos términos
 * de muestra (cada uno enlaza a su explicación) y el botón para ver el glosario entero.
 */
export default function GlossaryTeaser({ className }) {
  const { t } = useI18n()
  return (
    // Rejilla: título a la izquierda y, en pantallas grandes, la invitación a proponer palabras a la derecha.
    <section
      aria-labelledby="glossary-teaser"
      className={cx('grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end', className)}
    >
      <hgroup className="max-w-2xl">
        <Eyebrow>{t('glossary.teaser.eyebrow')}</Eyebrow>
        <h2 id="glossary-teaser" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('glossary.teaser.title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('glossary.teaser.text')}</p>
      </hgroup>
      {/* Enlaces al glosario: unos términos de muestra (cada uno a su explicación) y el glosario entero. */}
      <nav
        aria-label={t('glossary.teaser.termsLabel')}
        className="col-span-full -mt-2 grid gap-6 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
      >
        <ul className="flex flex-wrap gap-2">
          {FEATURED_TERMS.map((id) => (
            <li key={id}>
              <Link
                to={termPath(id)}
                className="inline-flex min-h-[2.75rem] items-center rounded-full border border-slate-200 bg-canvas px-4 text-sm font-semibold text-ink-soft transition-colors hover:border-accent-line hover:text-accent"
              >
                {t(`glossary.terms.${id}.term`)}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink to={paths.glossary} size="lg" className="justify-self-start shadow-pop">
          <Icon name="document" className="h-5 w-5" />
          {t('glossary.teaser.cta')}
          <Icon name="arrow-right" className="h-4 w-4" />
        </ButtonLink>
      </nav>
      <MissingWordCallout id="glossary-teaser-missing" headingLevel="h3" className="lg:col-start-2 lg:row-start-1" />
    </section>
  )
}
