import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'

const HIGHLIGHTS = [
  { icon: 'newspaper', key: 'news' },
  { icon: 'briefcase', key: 'jobs' },
  { icon: 'chat', key: 'forum' },
]

export default function HeroSection() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()

  return (
    <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 text-white">
      <div className="page-container grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">{t('home.hero.eyebrow')}</p>
          <h1 id="hero-heading" className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {t('home.hero.title')}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brand-100">
            {t('home.hero.text', { name: siteConfig.name })}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {isAuthenticated ? (
              <ButtonLink to={paths.forum} variant="inverse">
                {t('home.hero.goForum')}
              </ButtonLink>
            ) : (
              <ButtonLink to={paths.register} variant="inverse">
                {t('home.hero.register')}
              </ButtonLink>
            )}
            <ButtonLink to={paths.jobs} variant="outlineInverse">
              {t('home.hero.seeJobs')}
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-4">
          {HIGHLIGHTS.map((item) => (
            <li key={item.key} className="flex items-start gap-4 rounded-card bg-white/10 p-5 ring-1 ring-white/20">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-white/15">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-bold">{t(`home.hero.${item.key}Title`)}</h2>
                <p className="mt-1 text-brand-100">{t(`home.hero.${item.key}Text`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
