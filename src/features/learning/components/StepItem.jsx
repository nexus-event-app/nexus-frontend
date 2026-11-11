import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import Icon from '@/shared/components/Icon'
import ResourceLink from './ResourceLink'

/** Una etapa de la ruta: qué se aprende, recursos gratuitos, un proyecto y, con sesión, la casilla de «Hecha». */
export default function StepItem({ path, step, number, progress }) {
  const { t } = useI18n()
  const base = `learning.steps.${path.id}.${step.id}`
  const titleId = `etapa-${step.id}`
  const done = progress.isDone(path.id, step.id)
  const title = t(`${base}.title`)

  return (
    <article
      aria-labelledby={titleId}
      className={cx('card p-5 sm:p-6', done && 'border-green-600 dark:border-green-500')}
    >
      <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <hgroup>
          <p className="text-sm font-bold uppercase tracking-wide text-accent">
            {t('learning.detail.step', { number })}
          </p>
          <h2 id={titleId} className="mt-1 text-xl font-bold text-ink">
            {title}
          </h2>
        </hgroup>
        {progress.enabled && (
          <label
            className={cx(
              'inline-flex min-h-[2.75rem] cursor-pointer items-center gap-2 rounded-control border px-3 text-sm font-semibold',
              done
                ? 'border-green-600 bg-green-50 text-green-800 dark:border-green-500 dark:bg-green-500/15 dark:text-green-200'
                : 'border-slate-300 text-ink-soft hover:bg-slate-50',
            )}
          >
            <input
              type="checkbox"
              checked={done}
              disabled={!progress.ready || progress.isPending(path.id, step.id)}
              onChange={() => progress.toggle(path.id, step.id)}
              className="h-5 w-5 rounded border-slate-400 text-green-700 focus-visible:ring-2 focus-visible:ring-brand-600"
            />
            {t('learning.progress.done')}
            <span className="sr-only">{t('learning.progress.doneSr', { step: title })}</span>
          </label>
        )}
      </header>
      <p className="mt-3 leading-relaxed text-ink-soft">{t(`${base}.text`)}</p>

      <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-ink-muted">
        {t('learning.detail.resources')}
      </h3>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {step.resources.map((resource) => (
          <li key={resource.url}>
            <ResourceLink resource={resource} />
          </li>
        ))}
      </ul>

      <h3 className="mt-5 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-ink-muted">
        <Icon name="code" className="h-4 w-4" />
        {t('learning.detail.project')}
      </h3>
      <p className="mt-1 text-ink-soft">{t(`${base}.project`)}</p>
    </article>
  )
}
