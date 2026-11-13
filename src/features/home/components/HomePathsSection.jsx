import { useAuth } from '@/features/auth/hooks/useAuth'
import LearningPathCard from '@/features/learning/components/LearningPathCard'
import { LEARNING_PATHS } from '@/features/learning/data/learningPaths'
import { useLearningProgress } from '@/features/learning/hooks/useLearningProgress'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import HomeSection from './HomeSection'

/**
 * Rutas de aprendizaje en la portada: lo que más motiva a empezar. Con sesión, cada ruta muestra el progreso guardado.
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
              done={progress.ready ? progress.countDone(path) : null}
              headingLevel="h3"
              compact
              delay={index * 80}
            />
          </li>
        ))}
      </ul>
    </HomeSection>
  )
}
