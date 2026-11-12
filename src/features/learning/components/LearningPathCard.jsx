import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useInView } from '@/shared/hooks/useInView'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import PathProgress from './PathProgress'

/**
 * Tarjeta de una ruta de aprendizaje, la misma en la portada y en la página de rutas. Sobria a propósito: blanca, con
 * el icono de la ruta sobre el morado oscuro de la marca (igual en todas) y el número de la ruta como detalle. Toda la
 * tarjeta lleva a la ruta. Con progreso guardado, la barra aparece al pie. Sube un poco al entrar en pantalla.
 * `compact`: para la portada, donde caben cinco en fila.
 */
export default function LearningPathCard({
  path,
  number,
  done = null,
  headingLevel = 'h2',
  compact = false,
  delay = 0,
}) {
  const { t } = useI18n()
  const Heading = headingLevel
  const [ref, inView] = useInView()
  const total = path.steps.length
  const name = t(`learning.paths.${path.id}.name`)

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cx(
        'group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-surface shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent-line hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600',
        compact ? 'p-5' : 'p-6',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 print:translate-y-0 print:opacity-100',
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-950 text-white shadow-md ring-1 ring-inset ring-white/10"
        >
          <Icon name={path.icon} className="h-6 w-6" />
        </span>
        {/* Número de la ruta, como en un índice: decorativo (el orden ya lo da la lista). */}
        {number && (
          <span aria-hidden="true" className="font-mono text-sm font-semibold tabular-nums text-ink-muted">
            {String(number).padStart(2, '0')}
          </span>
        )}
      </header>
      <Heading className={cx('mt-4 font-bold leading-snug text-ink', compact ? 'text-lg' : 'text-xl')}>
        <Link
          to={paths.learningPath(path.id)}
          className="after:absolute after:inset-0 after:rounded-3xl group-hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {name}
        </Link>
      </Heading>
      <p className={cx('mb-5 mt-2 text-ink-muted', compact ? 'line-clamp-3 text-sm' : 'leading-relaxed')}>
        {t(`learning.paths.${path.id}.tagline`)}
      </p>
      {done !== null && done > 0 && <PathProgress className="mb-5" done={done} total={total} />}
      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-ink-muted">
        <dl className={cx('flex flex-wrap gap-x-4 gap-y-1', compact && 'flex-col')}>
          <dt className="sr-only">{t('learning.card.duration')}</dt>
          <dd className="inline-flex items-center gap-1.5">
            <Icon name="clock" className="h-4 w-4" />
            {t(`learning.paths.${path.id}.duration`)}
          </dd>
          <dt className="sr-only">{t('learning.card.stepsLabel')}</dt>
          <dd className="inline-flex items-center gap-1.5">
            <Icon name="academic" className="h-4 w-4" />
            {t('learning.card.steps', { count: total })}
          </dd>
        </dl>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white"
        >
          <Icon name="arrow-right" className="h-4 w-4" />
        </span>
      </footer>
    </article>
  )
}
