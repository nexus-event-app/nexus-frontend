import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import Icon from '@/shared/components/Icon'
import ResourceLink from './ResourceLink'

/**
 * Una etapa de la ruta, como un paso de un recorrido: a la izquierda su número en un círculo (verde con ✓ si está
 * hecha), unido a los demás por una línea; a la derecha la tarjeta con qué se aprende, los recursos, el proyecto para
 * practicar y, con sesión, la casilla de «Hecha».
 */
export default function StepItem({ path, step, number, progress }) {
  const { t } = useI18n()
  const base = `learning.steps.${path.id}.${step.id}`
  const titleId = `etapa-${step.id}`
  const done = progress.isDone(path.id, step.id)
  const title = t(`${base}.title`)

  return (
    // Sin envoltorio: el círculo y la tarjeta se colocan en la rejilla del <li> que los contiene (ver la página).
    <>
      {/* Número de la etapa: decorativo (el título ya dice «Etapa N» a los lectores de pantalla). */}
      <span
        aria-hidden="true"
        className={cx(
          'relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-base font-bold ring-4 ring-canvas',
          done
            ? 'bg-green-600 text-white dark:bg-green-500'
            : 'bg-gradient-to-br from-brand-700 to-brand-950 text-white',
        )}
      >
        {done ? <Icon name="check" className="h-5 w-5" /> : number}
      </span>
      <article
        aria-labelledby={titleId}
        className={cx(
          'rounded-3xl border bg-surface p-6 shadow-card sm:p-7',
          done ? 'border-green-600 dark:border-green-500' : 'border-slate-200',
        )}
      >
        <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <h2 id={titleId} className="text-xl font-bold leading-snug tracking-tight text-ink">
            <span className="sr-only">{t('learning.detail.step', { number })}: </span>
            {title}
          </h2>
          {progress.enabled && (
            <label
              className={cx(
                'inline-flex min-h-[2.75rem] cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors sm:min-h-[2.25rem]',
                done
                  ? 'border-green-600 bg-green-50 text-green-800 dark:border-green-500 dark:bg-green-500/15 dark:text-green-200'
                  : 'border-slate-200 text-ink-soft hover:border-accent-line hover:text-accent',
              )}
            >
              <input
                type="checkbox"
                checked={done}
                disabled={!progress.ready || progress.isPending(path.id, step.id)}
                onChange={() => progress.toggle(path.id, step.id)}
                className="h-4 w-4 rounded border-slate-400 text-green-700 focus-visible:ring-2 focus-visible:ring-brand-600"
              />
              {t('learning.progress.done')}
              <span className="sr-only">{t('learning.progress.doneSr', { step: title })}</span>
            </label>
          )}
        </header>
        <p className="mt-3 leading-relaxed text-ink-soft">{t(`${base}.text`)}</p>

        <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-ink-muted">
          {t('learning.detail.resources')}
        </h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {step.resources.map((resource) => (
            <li key={resource.url}>
              <ResourceLink resource={resource} />
            </li>
          ))}
        </ul>

        {/* El proyecto de la etapa, destacado: es lo que convierte lo aprendido en algo que enseñar. */}
        <p className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 rounded-2xl bg-accent-soft px-4 py-4 text-ink-soft">
          <span
            aria-hidden="true"
            className="row-span-2 flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-accent"
          >
            <Icon name="code" className="h-5 w-5" />
          </span>
          <strong className="text-sm font-bold uppercase tracking-[0.15em] text-accent">
            {t('learning.detail.project')}
          </strong>
          <span className="mt-1 leading-relaxed">{t(`${base}.project`)}</span>
        </p>
      </article>
    </>
  )
}
