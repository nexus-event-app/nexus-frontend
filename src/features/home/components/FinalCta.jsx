import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'

export default function FinalCta() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()

  return (
    <section
      aria-labelledby="home-cta"
      className="page-gutter bg-gradient-to-br from-brand-700 to-brand-950 py-16 text-center text-white"
    >
      <h2 id="home-cta" className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
        {t('home.cta.title')}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">{t('home.cta.text')}</p>
      <menu className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {isAuthenticated ? (
          <li>
            <ButtonLink to={paths.forumNew} variant="inverse">
              {t('home.cta.create')}
            </ButtonLink>
          </li>
        ) : (
          <>
            <li>
              <ButtonLink to={paths.register} variant="inverse">
                {t('home.cta.register')}
              </ButtonLink>
            </li>
            <li>
              <ButtonLink to={paths.login} variant="outlineInverse">
                {t('home.cta.haveAccount')}
              </ButtonLink>
            </li>
          </>
        )}
      </menu>
    </section>
  )
}
