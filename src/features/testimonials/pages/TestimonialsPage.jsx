import { useAuth } from '@/features/auth/hooks/useAuth'
import SignInPrompt from '@/features/auth/components/SignInPrompt'
import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { Navigate } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import TestimonialForm from '../components/TestimonialForm'
import TestimonialGrid from '../components/TestimonialGrid'
import { useTestimonials } from '../hooks/useTestimonials'

/** Seis testimonios por página: dos filas de tres en pantallas grandes. */
export const TESTIMONIALS_PAGE_SIZE = 6

/** Pasos de «Escribe en el muro», en orden; solo informan (no son enlaces). */
const SHARE_STEPS = [
  { key: 'write', icon: 'pencil' },
  { key: 'review', icon: 'shield' },
  { key: 'inspire', icon: 'sparkles' },
]

/** La parte derecha del panel (formulario o aviso): redondea las esquinas que no toca el bloque de la izquierda. */
const SHARE_SIDE = 'rounded-b-3xl rounded-t-none p-6 sm:p-8 lg:rounded-r-3xl lg:rounded-bl-none'

export default function TestimonialsPage() {
  const { t } = useI18n()
  const { isAuthenticated, user } = useAuth()
  const request = useTestimonials()
  // La API devuelve todos los testimonios publicados (son pocos): se reparten en páginas aquí.
  const { page, buildHref } = useListQuery()

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo
        title={
          page > 1 ? `${t('testimonials.seoTitle')}${t('common.pageSuffix', { page })}` : t('testimonials.seoTitle')
        }
        description={t('testimonials.seoDescription', { name: siteConfig.name })}
        path={page > 1 ? `${paths.testimonials}?page=${page}` : paths.testimonials}
      />
      {/* Cuadrícula decorativa detrás de la cabecera, como en el resto de páginas. */}
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs items={[{ label: t('testimonials.breadcrumb'), to: paths.testimonials }]} />

      <header className="mb-10">
        <hgroup>
          <Eyebrow>{t('testimonials.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('testimonials.heading')}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{t('testimonials.description')}</p>
        </hgroup>
      </header>

      {/* El muro: un tablero con la cuadrícula suave de fondo donde las notas quedan colgadas, un poco torcidas. */}
      <section
        aria-label={t('testimonials.wallLabel')}
        aria-busy={request.loading}
        className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200 bg-canvas px-5 pb-8 pt-10 shadow-inner sm:px-10"
      >
        <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
        <QueryBoundary
          data={request.data}
          error={request.error}
          onRetry={request.reload}
          skeleton={<CardGridSkeleton count={TESTIMONIALS_PAGE_SIZE} withImage={false} />}
          errorTitle={t('testimonials.error')}
        >
          {(items) => {
            if (items.length === 0) {
              return (
                <EmptyState
                  icon="star"
                  title={t('testimonials.emptyTitle')}
                  description={t('testimonials.emptyText')}
                />
              )
            }
            const totalPages = Math.ceil(items.length / TESTIMONIALS_PAGE_SIZE)
            if (page > totalPages) return <Navigate to={buildHref(totalPages)} replace />
            const start = (page - 1) * TESTIMONIALS_PAGE_SIZE
            return (
              <>
                <TestimonialGrid items={items.slice(start, start + TESTIMONIALS_PAGE_SIZE)} />
                <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />
              </>
            )
          }}
        </QueryBoundary>
      </section>

      {/*
        «Escribe en el muro»: cabecera como la de los demás apartados y, debajo, un panel compacto (cabe en
        pantalla sin bajar): a la izquierda, sobre el degradado de la marca, cómo funciona; a la derecha, el
        formulario (o lo que haga falta antes: entrar o confirmar el email).
      */}
      <section aria-labelledby="share-heading" className="mt-20 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <header className="col-span-full mb-6">
          <hgroup>
            <Eyebrow>{t('testimonials.shareEyebrow')}</Eyebrow>
            <h2 id="share-heading" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t('testimonials.shareTitle')}
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">{t('testimonials.shareText')}</p>
          </hgroup>
        </header>
        {/* Las dos piezas forman un solo panel: cada una redondea sus esquinas exteriores. */}
        <aside
          aria-labelledby="share-steps-heading"
          className="relative isolate overflow-hidden rounded-t-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-6 text-white sm:p-8 lg:rounded-l-3xl lg:rounded-tr-none"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-brand-400/30 blur-3xl"
          />
          <h3 id="share-steps-heading" className="text-sm font-bold uppercase tracking-[0.2em] text-brand-200">
            {t('testimonials.shareSteps.label')}
          </h3>
          <ol className="mt-5 space-y-4">
            {SHARE_STEPS.map((step, index) => (
              <li key={step.key} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <p className="text-sm leading-relaxed text-brand-50">
                  <span className="sr-only">{index + 1}. </span>
                  {t(`testimonials.shareSteps.${step.key}`)}
                </p>
              </li>
            ))}
          </ol>
        </aside>
        {isAuthenticated && user?.emailVerified === false ? (
          <VerifyEmailNotice className={SHARE_SIDE}>{t('testimonials.confirmEmail')}</VerifyEmailNotice>
        ) : isAuthenticated ? (
          <TestimonialForm className={cx(SHARE_SIDE, 'border border-slate-200 bg-surface shadow-card')} />
        ) : (
          <SignInPrompt className={SHARE_SIDE}>{t('testimonials.signIn')}</SignInPrompt>
        )}
      </section>
    </PageMain>
  )
}
