import { Link } from '@/shared/i18n/router'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import ButtonLink from './ButtonLink'
import PageMain from './PageMain'
import Seo from './Seo'

const SUGGESTIONS = [
  { labelKey: 'common.notFound.news', to: paths.news },
  { labelKey: 'common.notFound.jobs', to: paths.jobs },
  { labelKey: 'common.notFound.forum', to: paths.forum },
  { labelKey: 'common.notFound.testimonials', to: paths.testimonials },
]

/** Página no encontrada. `embedded`: dentro de una página que ya tiene su <main> (panel de administración). */
export default function NotFound({ embedded = false }) {
  const { t } = useI18n()

  const content = (
    <section className="page-container max-w-xl py-[4.5rem] text-center sm:py-[5.5rem]">
      <Seo
        title={t('common.notFound.seoTitle')}
        description={t('common.notFound.seoDescription')}
        robots="noindex,nofollow"
      />
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
    </section>
  )
  return embedded ? content : <PageMain>{content}</PageMain>
}
