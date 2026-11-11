import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import PathProgress from './PathProgress'

/** Tarjeta de una ruta en la página principal de rutas. Toda la tarjeta lleva a la ruta. */
export default function LearningPathCard({ path, done }) {
  const { t } = useI18n()
  const name = t(`learning.paths.${path.id}.name`)

  return (
    <article className="card relative flex h-full flex-col p-6 transition-shadow hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600">
      <span className="flex h-12 w-12 items-center justify-center rounded-card bg-accent-soft text-accent">
        <Icon name={path.icon} className="h-7 w-7" />
      </span>
      <h2 className="mt-4 text-xl font-bold text-ink">
        <Link
          to={paths.learningPath(path.id)}
          className="after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {name}
        </Link>
      </h2>
      <p className="mt-2 text-ink-muted">{t(`learning.paths.${path.id}.tagline`)}</p>
      <dl className="mt-auto grid grid-cols-2 gap-4 pt-5 text-sm">
        <dt className="sr-only">{t('learning.card.duration')}</dt>
        <dd className="flex items-center gap-1.5 text-ink-soft">
          <Icon name="clock" className="h-4 w-4 text-ink-muted" />
          {t(`learning.paths.${path.id}.duration`)}
        </dd>
        <dt className="sr-only">{t('learning.card.stepsLabel')}</dt>
        <dd className="flex items-center gap-1.5 text-ink-soft">
          <Icon name="academic" className="h-4 w-4 text-ink-muted" />
          {t('learning.card.steps', { count: path.steps.length })}
        </dd>
      </dl>
      {done !== null && done > 0 && <PathProgress className="mt-4" done={done} total={path.steps.length} />}
    </article>
  )
}
