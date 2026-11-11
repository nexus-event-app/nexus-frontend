import { useAuth } from '@/features/auth/hooks/useAuth'
import { LEARNING_PATHS } from '@/features/learning/data/learningPaths'
import { useLearningProgress } from '@/features/learning/hooks/useLearningProgress'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useInView } from '@/shared/hooks/useInView'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import HomeSection from './HomeSection'

/** Color propio de cada ruta, para que se distingan de un vistazo. */
const PATH_GRADIENTS = {
  frontend: 'from-indigo-500 via-violet-500 to-purple-600',
  backend: 'from-sky-500 via-blue-600 to-indigo-700',
  qa: 'from-emerald-500 via-teal-500 to-cyan-600',
  datos: 'from-amber-500 via-orange-500 to-rose-500',
  ia: 'from-fuchsia-500 via-pink-500 to-rose-500',
}

const BENEFITS = [
  { key: 'benefitProgress', icon: 'academic' },
  { key: 'benefitJobs', icon: 'bookmark' },
  { key: 'benefitForum', icon: 'chat' },
  { key: 'benefitAlerts', icon: 'bell' },
]

function PathCard({ path, done, delay }) {
  const { t } = useI18n()
  const [ref, inView] = useInView()
  const total = path.steps.length
  const name = t(`learning.paths.${path.id}.name`)

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 print:translate-y-0 print:opacity-100',
      )}
    >
      {/* Cabecera de color con el icono de la ruta: decorativa, el nombre va en el título. */}
      <span
        aria-hidden="true"
        className={cx('relative flex h-28 items-end justify-between bg-gradient-to-br p-4', PATH_GRADIENTS[path.id])}
      >
        <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 transition-transform duration-500 group-hover:scale-125" />
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-inset ring-white/30 backdrop-blur transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
          <Icon name={path.icon} className="h-7 w-7" />
        </span>
        <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {t('home.paths.steps', { count: total })}
        </span>
      </span>
      <h3 className="mx-5 mt-4 text-lg font-bold text-ink">
        <Link
          to={paths.learningPath(path.id)}
          className="after:absolute after:inset-0 group-hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {name}
        </Link>
      </h3>
      <p className="mx-5 mt-1 line-clamp-3 text-sm text-ink-muted">{t(`learning.paths.${path.id}.tagline`)}</p>
      <footer className="mx-5 mb-5 mt-auto pt-4">
        {done !== null && done > 0 && (
          <p className="mb-3">
            <span className="flex justify-between text-xs font-semibold text-ink-soft">
              <span>{t('learning.progress.label')}</span>
              <span>{t('learning.progress.value', { done, total })}</span>
            </span>
            <span aria-hidden="true" className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-slate-200">
              <span
                className={cx('block h-full rounded-full bg-gradient-to-r', PATH_GRADIENTS[path.id])}
                style={{ width: `${(done / total) * 100}%` }}
              />
            </span>
          </p>
        )}
        <p className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1.5 text-ink-muted">
            <Icon name="clock" className="h-4 w-4" />
            {t(`learning.paths.${path.id}.duration`)}
          </span>
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white"
          >
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </p>
      </footer>
    </article>
  )
}

/**
 * Rutas de aprendizaje en la portada, justo después del mensaje principal: lo que más motiva a empezar. Sin sesión,
 * termina con lo que se gana al unirse; con sesión, cada ruta muestra el progreso guardado.
 */
export default function HomePathsSection() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  const progress = useLearningProgress()

  return (
    <HomeSection
      id="home-paths"
      eyebrow={t('home.paths.eyebrow')}
      title={isAuthenticated ? t('home.paths.titleSignedIn') : t('home.paths.title')}
      description={t('home.paths.description')}
      linkTo={paths.learning}
      linkLabel={t('home.paths.link')}
      tinted
    >
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {LEARNING_PATHS.map((path, index) => (
          <li key={path.id}>
            <PathCard path={path} done={progress.ready ? progress.countDone(path) : null} delay={index * 80} />
          </li>
        ))}
      </ul>

      {!isAuthenticated && (
        <aside
          aria-labelledby="home-join"
          className="relative mt-10 grid items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-6 text-white shadow-pop sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)_auto]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10"
          />
          <hgroup>
            <h3 id="home-join" className="text-2xl font-bold">
              {t('home.paths.joinTitle')}
            </h3>
            <p className="mt-1 text-brand-100">{t('home.paths.joinText')}</p>
          </hgroup>
          <ul className="grid gap-x-6 gap-y-2 text-sm font-medium sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li key={benefit.key} className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Icon name={benefit.icon} className="h-4 w-4" />
                </span>
                {t(`home.paths.${benefit.key}`)}
              </li>
            ))}
          </ul>
          <ButtonLink
            to={paths.register}
            variant="inverse"
            className="justify-self-start rounded-full px-6 transition-all hover:-translate-y-0.5 lg:justify-self-end"
          >
            {t('home.paths.join')}
          </ButtonLink>
        </aside>
      )}
    </HomeSection>
  )
}
