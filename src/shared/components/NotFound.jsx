import { Link } from '@/shared/i18n/router'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import ButtonLink from './ButtonLink'
import Seo from './Seo'

const SUGGESTIONS = [
  { labelKey: 'common.notFound.news', to: paths.news },
  { labelKey: 'common.notFound.jobs', to: paths.jobs },
  { labelKey: 'common.notFound.forum', to: paths.forum },
  { labelKey: 'common.notFound.testimonials', to: paths.testimonials },
]

export default function NotFound() {
  const { t } = useI18n()

  return (
    <div className="page-container page-section">
      <Seo title={t('common.notFound.seoTitle')} description={t('common.notFound.seoDescription')} robots="noindex,nofollow" />
      <div className="mx-auto max-w-xl py-8 text-center">
        <p className="eyebrow">{t('common.notFound.eyebrow')}</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">{t('common.notFound.title')}</h1>
        <p className="mt-4 text-lg text-ink-muted">{t('common.notFound.text')}</p>
        <ul className="mt-6 space-y-1">
          {SUGGESTIONS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="link inline-flex min-h-[2.75rem] items-center">
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink to={paths.home} className="mt-6">
          {t('common.notFound.backHome')}
        </ButtonLink>
      </div>
    </div>
  )
}
