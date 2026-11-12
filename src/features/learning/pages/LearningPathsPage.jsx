import { useAuth } from '@/features/auth/hooks/useAuth'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import { formatDate } from '@/shared/utils/date'
import LearningPathCard from '../components/LearningPathCard'
import { LEARNING_PATHS, RESOURCES_REVIEWED_AT } from '../data/learningPaths'
import { useLearningProgress } from '../hooks/useLearningProgress'

const HOW = [
  { key: 'choose', icon: 'search' },
  { key: 'practice', icon: 'code' },
  { key: 'progress', icon: 'check-circle' },
]

export default function LearningPathsPage() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  const progress = useLearningProgress()

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo
        title={t('learning.seoTitle')}
        description={t('learning.seoDescription', { name: siteConfig.name })}
        path={paths.learning}
      />
      {/* Cuadrícula decorativa detrás de la cabecera, como en el resto de páginas. */}
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs items={[{ label: t('learning.breadcrumb'), to: paths.learning }]} />

      <header className="mb-10">
        <hgroup>
          <Eyebrow>{t('learning.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('learning.title')}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{t('learning.intro')}</p>
        </hgroup>
      </header>

      {/*
        «Cómo funcionan», destacado antes de las rutas: una franja con el degradado de la marca. A la izquierda el
        título (y, sin sesión, la invitación a crear cuenta para guardar el progreso); a la derecha, los tres pasos
        numerados. Colores fijos: texto blanco sobre morado oscuro en los dos temas.
      */}
      <section
        aria-labelledby="learning-how"
        className="relative isolate mb-12 grid gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-6 text-white shadow-pop sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:items-center lg:p-10"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-400/25 blur-3xl"
        />
        <header>
          <hgroup>
            <Eyebrow tone="dark">{t('learning.how.eyebrow')}</Eyebrow>
            <h2 id="learning-how" className="mt-3 text-3xl font-bold tracking-tight">
              {t('learning.how.title')}
            </h2>
            {!isAuthenticated && <p className="mt-3 leading-relaxed text-brand-100">{t('learning.how.ctaText')}</p>}
          </hgroup>
          {!isAuthenticated && (
            <ButtonLink
              to={paths.register}
              variant="inverse"
              className="mt-6 rounded-full px-6 transition-all hover:-translate-y-0.5"
            >
              {t('learning.how.cta')}
            </ButtonLink>
          )}
        </header>
        <ol className="grid gap-4 sm:grid-cols-3">
          {HOW.map((item, index) => (
            <li
              key={item.key}
              className="grid grid-cols-[auto_minmax(0,1fr)] content-start gap-x-3 gap-y-3 rounded-2xl bg-white/10 p-5 ring-1 ring-inset ring-white/15 backdrop-blur-sm"
            >
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              {/* Número del paso, grande y discreto: decorativo (la lista ya está ordenada). */}
              <span aria-hidden="true" className="justify-self-end font-mono text-2xl font-bold text-white/40">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="col-span-full text-lg font-bold">{t(`learning.how.${item.key}.title`)}</h3>
              <p className="col-span-full -mt-1 text-sm leading-relaxed text-brand-100">
                {t(`learning.how.${item.key}.text`)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <ul aria-label={t('learning.listLabel')} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LEARNING_PATHS.map((path, index) => (
          <li key={path.id}>
            <LearningPathCard
              path={path}
              number={index + 1}
              done={progress.ready ? progress.countDone(path) : null}
              delay={(index % 3) * 80}
            />
          </li>
        ))}
        {/* Con cinco rutas queda un hueco en la rejilla: lo ocupa una ayuda para elegir, que lleva al foro. */}
        <li>
          <aside
            aria-labelledby="learning-choose"
            className="flex h-full flex-col rounded-3xl border-2 border-dashed border-slate-300 p-6"
          >
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent"
            >
              <Icon name="chat" className="h-6 w-6" />
            </span>
            <h2 id="learning-choose" className="mt-4 text-xl font-bold leading-snug text-ink">
              {t('learning.choose.title')}
            </h2>
            <p className="mb-5 mt-2 leading-relaxed text-ink-muted">{t('learning.choose.text')}</p>
            <ButtonLink to={paths.forum} variant="secondary" className="mt-auto self-start rounded-full">
              {t('learning.choose.cta')}
            </ButtonLink>
          </aside>
        </li>
      </ul>

      <p className="mt-10 text-sm text-ink-muted">
        {t('learning.reviewed', { date: formatDate(RESOURCES_REVIEWED_AT) })}
      </p>
    </PageMain>
  )
}
