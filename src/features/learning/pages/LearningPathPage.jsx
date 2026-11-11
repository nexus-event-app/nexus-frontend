import { useParams } from 'react-router-dom'
import SignInPrompt from '@/features/auth/components/SignInPrompt'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Icon from '@/shared/components/Icon'
import NotFound from '@/shared/components/NotFound'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths, withQuery } from '@/shared/config/paths'
import { routeSubsegment } from '@/shared/i18n/languages'
import { Link, Navigate } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import PathProgress from '../components/PathProgress'
import StepItem from '../components/StepItem'
import { findLearningPath, LEARNING_PATHS } from '../data/learningPaths'
import { useLearningProgress } from '../hooks/useLearningProgress'

const ASIDE_LINK =
  'flex min-h-[2.75rem] items-center gap-2 rounded-control px-3 font-medium text-ink-soft hover:bg-slate-100 hover:text-accent'

export default function LearningPathPage() {
  const { t, lang } = useI18n()
  const { pathSlug } = useParams()
  const path = findLearningPath(pathSlug, lang)
  const progress = useLearningProgress()

  if (!path) return <NotFound />
  // Dirección con el identificador sin traducir: se lleva a la buena para que cada página tenga una sola URL.
  if (pathSlug !== routeSubsegment('rutas', path.id, lang)) return <Navigate to={paths.learningPath(path.id)} replace />

  const base = `learning.paths.${path.id}`
  const name = t(`${base}.name`)
  const total = path.steps.length

  return (
    <PageMain className="page-container page-section grid grid-cols-1 gap-x-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <Seo title={t(`${base}.name`)} description={t(`${base}.description`)} path={paths.learningPath(path.id)} />
      <Breadcrumbs
        className="col-span-full"
        items={[
          { label: t('learning.breadcrumb'), to: paths.learning },
          { label: name, to: paths.learningPath(path.id) },
        ]}
      />

      <header className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-accent-soft text-accent">
          <Icon name={path.icon} className="h-8 w-8" />
        </span>
        <hgroup>
          <p className="eyebrow">{t('learning.breadcrumb')}</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{name}</h1>
          <p className="mt-3 text-lg text-ink-muted">{t(`${base}.description`)}</p>
        </hgroup>
      </header>

      {/* En pantallas grandes, el resumen acompaña a las etapas en una columna fija a la derecha. */}
      <aside
        aria-label={t('learning.detail.summary')}
        className="mt-8 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-3 lg:row-start-2 lg:mt-0 lg:self-start"
      >
        <dl className="card grid gap-4 p-5 text-sm">
          <dt className="font-semibold text-ink">{t('learning.detail.audience')}</dt>
          <dd className="-mt-3 text-ink-soft">{t(`${base}.audience`)}</dd>
          <dt className="font-semibold text-ink">{t('learning.detail.duration')}</dt>
          <dd className="-mt-3 text-ink-soft">{t(`${base}.duration`)}</dd>
          <dt className="font-semibold text-ink">{t('learning.detail.steps')}</dt>
          <dd className="-mt-3 text-ink-soft">{total}</dd>
        </dl>
        {progress.ready && <PathProgress className="card mt-4 p-5" done={progress.countDone(path)} total={total} />}
        <nav aria-labelledby="learning-next" className="card mt-4 p-3">
          <h2 id="learning-next" className="px-3 pb-1 pt-2 text-sm font-bold uppercase tracking-wide text-ink-muted">
            {t('learning.detail.next')}
          </h2>
          <ul>
            <li>
              <Link to={withQuery(paths.jobs, path.search)} className={ASIDE_LINK}>
                <Icon name="briefcase" />
                {t('learning.detail.jobs')}
              </Link>
            </li>
            <li>
              <Link to={withQuery(paths.forum, path.search)} className={ASIDE_LINK}>
                <Icon name="chat" />
                {t('learning.detail.forum')}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {!progress.enabled && (
        <section aria-label={t('learning.progress.label')} className="mt-8">
          <SignInPrompt>{t('learning.progress.signIn')}</SignInPrompt>
        </section>
      )}

      <ol className="mt-8 space-y-6 lg:col-start-1">
        {path.steps.map((step, index) => (
          <li key={step.id}>
            <StepItem path={path} step={step} number={index + 1} progress={progress} />
          </li>
        ))}
      </ol>

      <nav aria-labelledby="learning-others" className="col-span-full mt-14">
        <h2 id="learning-others" className="text-2xl font-bold tracking-tight text-ink">
          {t('learning.detail.others')}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {LEARNING_PATHS.filter((other) => other.id !== path.id).map((other) => (
            <li key={other.id}>
              <Link
                to={paths.learningPath(other.id)}
                className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-slate-300 px-4 font-semibold text-ink-soft hover:border-accent-line hover:text-accent"
              >
                <Icon name={other.icon} />
                {t(`learning.paths.${other.id}.name`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageMain>
  )
}
