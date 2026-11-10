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
    <section
      aria-labelledby="hero-heading"
      className="page-gutter grid items-center gap-10 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 py-14 text-white sm:py-20 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">{t('home.hero.eyebrow')}</p>
        <h1 id="hero-heading" className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {t('home.hero.title')}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-brand-100">{t('home.hero.text', { name: siteConfig.name })}</p>
        <menu className="mt-8 flex flex-col gap-3 sm:flex-row">
          <li>
            {isAuthenticated ? (
              <ButtonLink to={paths.forum} variant="inverse" className="w-full sm:w-auto">
                {t('home.hero.goForum')}
              </ButtonLink>
            ) : (
              <ButtonLink to={paths.register} variant="inverse" className="w-full sm:w-auto">
                {t('home.hero.register')}
              </ButtonLink>
            )}
          </li>
          <li>
            <ButtonLink to={paths.jobs} variant="outlineInverse" className="w-full sm:w-auto">
              {t('home.hero.seeJobs')}
            </ButtonLink>
          </li>
        </menu>
      </header>

      <ul className="grid gap-4">
        {HIGHLIGHTS.map((item) => (
          <li
            key={item.key}
            className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 rounded-card bg-white/10 p-5 ring-1 ring-white/20"
          >
            <span className="row-span-2 flex h-11 w-11 items-center justify-center rounded-control bg-white/15">
              <Icon name={item.icon} className="h-6 w-6" />
            </span>
            <h2 className="font-bold">{t(`home.hero.${item.key}Title`)}</h2>
            <p className="mt-1 text-brand-100">{t(`home.hero.${item.key}Text`)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
