import { useAuth } from '@/features/auth/hooks/useAuth'
import LearningPathCard from '@/features/learning/components/LearningPathCard'
import { LEARNING_PATHS } from '@/features/learning/data/learningPaths'
import { useLearningProgress } from '@/features/learning/hooks/useLearningProgress'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import HomeSection from './HomeSection'

const BENEFITS = [
  { key: 'benefitProgress', icon: 'academic' },
  { key: 'benefitJobs', icon: 'bookmark' },
  { key: 'benefitForum', icon: 'chat' },
  { key: 'benefitAlerts', icon: 'bell' },
]

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
            <LearningPathCard
              path={path}
              number={index + 1}
              done={progress.ready ? progress.countDone(path) : null}
              headingLevel="h3"
              compact
              delay={index * 80}
            />
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
