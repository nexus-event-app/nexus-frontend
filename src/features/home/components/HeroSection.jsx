import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import HeroActions from './HeroActions'
import HeroIllustration from './HeroIllustration'

const SMALL =
  'block text-xl font-semibold leading-snug tracking-[0.01em] text-brand-ink dark:text-brand-200 sm:text-2xl xl:text-[1.9rem]'
const BIG =
  'block text-5xl leading-[1.08] tracking-[-0.01em] text-brand-ink dark:text-white sm:text-[3.6rem] xl:text-[4.4rem]'
const MEDIUM =
  'block text-4xl leading-[1.08] tracking-[-0.01em] text-brand-ink dark:text-white sm:text-[2.9rem] xl:text-[3.4rem]'
const MARK =
  "relative isolate inline-block after:pointer-events-none after:absolute after:-inset-x-[0.06em] after:bottom-[0.04em] after:-z-10 after:h-[0.42em] after:-rotate-1 after:rounded-full after:bg-brand-300 after:content-[''] dark:after:bg-brand-500/60"

export default function HeroSection() {
  const { t } = useI18n()
  const { isAuthenticated, user } = useAuth()
  const name = siteConfig.name

  return (
    <section
      aria-labelledby="hero-heading"
      className="page-gutter relative isolate grid items-center gap-x-12 gap-y-10 overflow-hidden bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 pb-10 pt-6 text-ink dark:from-canvas dark:via-surface dark:to-canvas sm:pb-12 sm:pt-8 lg:min-h-[34rem] lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-x-6 xl:grid-cols-[minmax(0,1fr)_28rem]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 -z-10 h-[32rem] w-[32rem] animate-drift rounded-full bg-brand-300/40 blur-3xl dark:bg-brand-700/30"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-[28rem] w-[28rem] animate-drift-slow rounded-full bg-brand-400/25 blur-3xl dark:bg-brand-800/30"
      />

      <header className="text-center lg:text-left">
        <Eyebrow className="animate-rise-in text-base">{name}</Eyebrow>
        <h1 id="hero-heading" className="mt-4 animate-rise-in font-bold uppercase [animation-delay:80ms] lg:w-fit">
          <span className={SMALL}>{t('home.hero.titleLead')}</span>{' '}
          <span className={cx(BIG, 'mt-1')}>
            <span className={MARK}>{t('home.hero.title')}</span>
          </span>{' '}
          <span className={cx(SMALL, 'mt-4')}>{t('home.hero.subtitle')}</span>{' '}
          <span className={cx(MEDIUM, 'mt-1 lg:pl-[24%]')}>
            <span className={MARK}>{t('home.hero.titleEnd')}</span>
          </span>
        </h1>
        <HeroActions className="mx-auto mt-8 max-w-xl animate-rise-in [animation-delay:160ms] lg:mx-0" />

        {isAuthenticated ? (
          <p className="mt-7 animate-rise-in text-lg font-semibold text-ink [animation-delay:240ms]">
            {t('home.hero.greeting', { name: user.name })}
          </p>
        ) : (
          <menu className="mt-7 flex animate-rise-in flex-col items-center gap-4 [animation-delay:240ms] sm:flex-row sm:items-start lg:justify-start">
            <li className="flex flex-col items-center gap-2 sm:items-start">
              <ButtonLink
                to={paths.register}
                variant="primary"
                className="rounded-full px-7 py-3 text-base shadow-lg shadow-brand-950/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {t('home.hero.join')}
              </ButtonLink>
              <p className="text-sm text-ink-muted">{t('home.hero.free')}</p>
            </li>
            <li>
              <Link
                to={paths.login}
                className="inline-flex min-h-[2.75rem] items-center font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                {t('home.hero.haveAccount')}
              </Link>
            </li>
          </menu>
        )}
      </header>

      <HeroIllustration className="relative hidden h-[23rem] animate-rise-in xl:h-[26rem] [animation-delay:200ms] lg:block" />
    </section>
  )
}
