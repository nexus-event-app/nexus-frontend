import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { JOIN_BENEFITS } from '../config/joinBenefits'

export default function HomeJoinBanner() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return null

  return (
    <aside
      aria-labelledby="home-join-banner"
      className="page-container my-12 grid gap-8 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-violet-50 p-6 shadow-[0_2px_0_rgba(91,69,224,0.12),0_5px_0_rgba(91,69,224,0.08),0_26px_40px_-20px_rgba(46,36,119,0.5)] dark:border-white/10 dark:from-white/5 dark:via-white/[0.03] dark:to-white/5 dark:shadow-[0_2px_0_rgba(0,0,0,0.35),0_5px_0_rgba(0,0,0,0.3),0_26px_40px_-20px_rgba(0,0,0,0.8)] sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:p-10"
    >
      <hgroup>
        <h2 id="home-join-banner" className="text-2xl font-bold text-brand-ink dark:text-white sm:text-3xl">
          {t('home.joinBanner.title')}
        </h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{t('home.joinBanner.text')}</p>
      </hgroup>
      <ul className="grid gap-3 sm:grid-cols-2">
        {JOIN_BENEFITS.map((benefit) => (
          <li key={benefit.key} className="flex items-center gap-3 font-medium text-ink-soft">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[0_2px_0_rgba(91,69,224,0.2)] ring-1 ring-brand-200 dark:bg-white/10 dark:text-brand-300 dark:ring-white/10"
            >
              <Icon name={benefit.icon} className="h-5 w-5" />
            </span>
            {t(`home.paths.${benefit.key}`)}
          </li>
        ))}
      </ul>
      <menu className="flex flex-col items-center gap-2 sm:items-start lg:items-center">
        <li>
          <ButtonLink
            to={paths.register}
            variant="primary"
            className="rounded-full px-7 py-3 text-base shadow-[0_4px_0_#312e81,0_12px_20px_-8px_rgba(49,46,129,0.6)] transition-all hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-none"
          >
            {t('home.joinBanner.join')}
          </ButtonLink>
        </li>
        <li>
          <Link
            to={paths.login}
            className="inline-flex min-h-[2.75rem] items-center text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            {t('home.joinBanner.haveAccount')}
          </Link>
        </li>
      </menu>
    </aside>
  )
}
