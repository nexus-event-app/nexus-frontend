import { useAuth } from '@/features/auth/hooks/useAuth'
import LearningPathCard from '@/features/learning/components/LearningPathCard'
import { LEARNING_PATHS } from '@/features/learning/data/learningPaths'
import { useLearningProgress } from '@/features/learning/hooks/useLearningProgress'
import Illustration from '@/shared/components/Illustration'
import { illustrations } from '@/shared/config/illustrations'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import HomeSection from './HomeSection'

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
      <Illustration
        {...illustrations.learningRoad}
        className="absolute inset-x-0 bottom-1 mx-auto hidden w-[29rem] [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent),linear-gradient(to_bottom,transparent,black_4%,black_82%,transparent)] lg:block xl:w-[42rem]"
      />
    </HomeSection>
  )
}
