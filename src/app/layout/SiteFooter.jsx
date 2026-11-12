import { Link } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useLatestTestimonials } from '@/features/testimonials/hooks/useTestimonials'
import Icon from '@/shared/components/Icon'
import Logo from '@/shared/components/Logo'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import { mainNavigation } from './navigation'

const LEGAL_LINKS = [
  { labelKey: 'common.footer.legalNotice', to: paths.legalNotice },
  { labelKey: 'common.footer.privacy', to: paths.privacy },
  { labelKey: 'common.footer.cookies', to: paths.cookies },
]

/** Enlace del pie: al pasar por encima se colorea y asoma una flecha. */
function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex min-h-[2.75rem] items-center gap-1.5 text-brand-100 transition-colors hover:text-white sm:min-h-0 sm:py-1.5"
    >
      {children}
      <Icon
        name="arrow-right"
        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </Link>
  )
}

/** Título de una columna del pie, con el mismo punto que los antetítulos de la portada (sin animación). */
function ColumnTitle({ children }) {
  return (
    <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
      <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-white/15">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-200" />
      </span>
      {children}
    </h2>
  )
}

/** Vuelve al principio de la página y deja el foco en el enlace de inicio de la cabecera. */
function BackToTop() {
  const { t } = useI18n()
  const handleClick = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.querySelector('header a[href]')?.focus({ preventScroll: true })
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1.5 pl-4 pr-1.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/15"
    >
      {t('common.footer.backToTop')}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-700 transition-transform group-hover:-translate-y-0.5">
        <Icon name="arrow-right" className="h-4 w-4 -rotate-90" />
      </span>
    </button>
  )
}

/**
 * Un testimonio pequeño y anónimo (el destacado o el más reciente): un guiño para dar algo de gracia al pie, como las
 * tarjetitas de la cabecera de la portada. Blanca, un poco inclinada, con las comillas de sello. No enlaza a ningún sitio
 * (los testimonios ya están en el menú). Colores fijos (tarjeta blanca sobre el morado) en los dos temas. Si aún no hay
 * testimonios, no se muestra.
 */
function FooterTestimonial() {
  const { t } = useI18n()
  const { data } = useLatestTestimonials()
  const testimonial = data?.find((item) => item.isHighlighted) ?? data?.[0]
  if (!testimonial) return null

  return (
    <section aria-labelledby="footer-testimonial" className="mt-6 max-w-[17rem]">
      <h2 id="footer-testimonial" className="sr-only">
        {t('common.footer.testimonialTitle')}
      </h2>
      <figure className="relative -rotate-2 rounded-xl bg-white px-4 pb-3 pt-4 text-gray-900 shadow-xl shadow-brand-950/40 transition-transform duration-300 hover:rotate-0">
        <span
          aria-hidden="true"
          className="absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-2xl font-bold leading-none text-white shadow-md"
        >
          <span className="translate-y-1.5">“</span>
        </span>
        <blockquote>
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-800">{testimonial.content}</p>
        </blockquote>
        <figcaption className="mt-2 flex items-center gap-2 text-xs">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800"
          >
            <Icon name="user" className="h-3.5 w-3.5" />
          </span>
          <span className="min-w-0 truncate">
            <strong className="font-semibold text-gray-900">{t('common.footer.anonymous')}</strong>
            {testimonial.role && <span className="text-gray-600"> · {testimonial.role}</span>}
          </span>
        </figcaption>
      </figure>
    </section>
  )
}

/**
 * Pie de la web, en el morado de la portada: presentación con un testimonio pequeño, enlaces en tres columnas y la
 * barra con el copyright y «Volver arriba».
 */
export default function SiteFooter() {
  const { isAuthenticated, user } = useAuth()
  const { t } = useI18n()

  return (
    <footer className="page-gutter relative isolate grid gap-x-10 gap-y-8 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 pt-10 text-white sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
      {/* Mismo degradado y luz que la portada, para cerrar la página con el color de la marca. Decorativo. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[30rem] w-[30rem] animate-drift-slow rounded-full bg-brand-500/30 blur-3xl"
      />

      {/* Presentación: el logo, qué es y un testimonio. El título solo lo oyen los lectores de pantalla. */}
      <section aria-labelledby="footer-about" className="sm:col-span-2 lg:col-span-1">
        <h2 id="footer-about" className="sr-only">
          {siteConfig.name}
        </h2>
        <Logo inverse />
        <p className="mt-4 max-w-sm text-brand-100">
          {t('seo.tagline')}. {t('common.footer.description')}
        </p>
        <FooterTestimonial />
      </section>

      <nav aria-label={t('common.footer.exploreLabel')}>
        <ColumnTitle>{t('common.footer.explore')}</ColumnTitle>
        <ul className="mt-4">
          {mainNavigation.map((item) => (
            <li key={item.to}>
              <FooterLink to={item.to}>{t(item.labelKey)}</FooterLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label={t('common.footer.accountLabel')}>
        <ColumnTitle>{t('common.footer.account')}</ColumnTitle>
        <ul className="mt-4">
          {isAuthenticated ? (
            <>
              <li>
                <FooterLink to={paths.profile(user)}>{t('common.account.profile')}</FooterLink>
              </li>
              <li>
                <FooterLink to={paths.savedJobs}>{t('common.account.savedJobs')}</FooterLink>
              </li>
              <li>
                <FooterLink to={paths.notifications}>{t('notifications.title')}</FooterLink>
              </li>
              <li>
                <FooterLink to={paths.forumNew}>{t('common.footer.newDiscussion')}</FooterLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <FooterLink to={paths.login}>{t('common.account.login')}</FooterLink>
              </li>
              <li>
                <FooterLink to={paths.register}>{t('common.account.register')}</FooterLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <nav aria-label={t('common.footer.legalLabel')}>
        <ColumnTitle>{t('common.footer.legal')}</ColumnTitle>
        <ul className="mt-4">
          {LEGAL_LINKS.map((item) => (
            <li key={item.to}>
              <FooterLink to={item.to}>{t(item.labelKey)}</FooterLink>
            </li>
          ))}
        </ul>
      </nav>

      <p className="relative col-span-full flex flex-col items-center justify-between gap-4 border-t border-white/15 py-4 text-sm text-brand-100 sm:flex-row">
        <span className="text-center sm:text-left">
          {t('common.footer.copyright', { year: new Date().getFullYear(), name: siteConfig.name })}
        </span>
        <BackToTop />
      </p>
    </footer>
  )
}
