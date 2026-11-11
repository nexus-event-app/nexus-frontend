import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Icon from '@/shared/components/Icon'
import PageHeader from '@/shared/components/PageHeader'
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
  const progress = useLearningProgress()

  return (
    <PageMain className="page-container page-section">
      <Seo
        title={t('learning.seoTitle')}
        description={t('learning.seoDescription', { name: siteConfig.name })}
        path={paths.learning}
      />
      <Breadcrumbs items={[{ label: t('learning.breadcrumb'), to: paths.learning }]} />
      <PageHeader eyebrow={t('learning.eyebrow')} title={t('learning.title')} description={t('learning.intro')} />

      <ul aria-label={t('learning.listLabel')} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LEARNING_PATHS.map((path) => (
          <li key={path.id}>
            <LearningPathCard path={path} done={progress.ready ? progress.countDone(path) : null} />
          </li>
        ))}
      </ul>

      <section aria-labelledby="learning-how" className="mt-14">
        <h2 id="learning-how" className="text-2xl font-bold tracking-tight text-ink">
          {t('learning.how.title')}
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {HOW.map((item) => (
            <li key={item.key} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
              <span className="row-span-2 flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="font-bold text-ink">{t(`learning.how.${item.key}.title`)}</h3>
              <p className="mt-1 text-ink-muted">{t(`learning.how.${item.key}.text`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 text-sm text-ink-muted">
        {t('learning.reviewed', { date: formatDate(RESOURCES_REVIEWED_AT) })}
      </p>
    </PageMain>
  )
}
