import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

const FEATURES = [
  { key: 'events', icon: 'calendar', tone: 'cool' },
  { key: 'jobs', icon: 'briefcase', tone: 'warm' },
  { key: 'forum', icon: 'chat', tone: 'cool' },
  { key: 'community', icon: 'users', tone: 'warm' },
]

const BENEFITS = [
  { key: 'benefitProgress', icon: 'academic' },
  { key: 'benefitJobs', icon: 'bookmark' },
  { key: 'benefitForum', icon: 'chat' },
  { key: 'benefitAlerts', icon: 'bell' },
]

const TONES = {
  cool: 'bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300',
  warm: 'bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300',
}

export default function HomeFeatures() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()

  return (
    <section
      aria-labelledby="home-features"
      className={cx(
        'page-gutter grid gap-10 py-14 sm:py-16',
        !isAuthenticated && 'xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-center',
      )}
    >
      <h2 id="home-features" className="sr-only">
        {t('home.hero.featuresTitle', { name: siteConfig.name })}
      </h2>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-brand-200 dark:lg:divide-white/10">
        {FEATURES.map((feature) => (
          <li key={feature.key} className="lg:px-7 lg:first:pl-0">
            <span
              aria-hidden="true"
              className={cx('flex h-14 w-14 items-center justify-center rounded-full', TONES[feature.tone])}
            >
              <Icon name={feature.icon} className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-brand-ink dark:text-white">
              {t(`home.features.${feature.key}Title`)}
            </h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{t(`home.features.${feature.key}Text`)}</p>
          </li>
        ))}
      </ul>

      {!isAuthenticated && (
        <aside
          aria-labelledby="home-join"
          className="rounded-3xl border border-brand-200 bg-brand-50/70 p-6 dark:border-white/10 dark:bg-white/5"
        >
          <h2 id="home-join" className="text-xl font-bold text-brand-ink dark:text-white">
            {t('home.paths.joinTitle')}
          </h2>
          <p className="mt-1 text-sm text-ink-muted">{t('home.paths.joinText')}</p>
          <ul className="mt-5 space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit.key} className="flex items-center gap-3 font-medium text-ink-soft">
                <Icon name={benefit.icon} className="h-5 w-5 shrink-0 text-brand-600 dark:text-brand-300" />
                {t(`home.paths.${benefit.key}`)}
              </li>
            ))}
          </ul>
          <ButtonLink to={paths.register} variant="primary" className="mt-6 w-full rounded-full">
            {t('home.paths.join')}
          </ButtonLink>
        </aside>
      )}
    </section>
  )
}
