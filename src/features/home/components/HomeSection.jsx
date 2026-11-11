import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import { Link } from '@/shared/i18n/router'
import { cx } from '@/shared/utils/classNames'

/**
 * Sección de la portada: antetítulo que se escribe solo, título grande, una frase que invita a entrar y el enlace
 * «Ver todo» en forma de pastilla. Detrás, una cuadrícula suave que se desvanece (decorativa). `dark`: fondo índigo
 * como el de la portada, para romper el ritmo de secciones claras.
 */
export default function HomeSection({
  id,
  eyebrow,
  title,
  description,
  linkTo,
  linkLabel,
  tinted = false,
  dark = false,
  children,
}) {
  return (
    <section
      aria-labelledby={id}
      className={cx(
        'page-gutter page-section relative isolate overflow-hidden',
        dark ? 'bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 text-white' : tinted && 'bg-surface',
      )}
    >
      <span
        aria-hidden="true"
        className={cx('pointer-events-none absolute inset-0 -z-10', dark ? 'bg-grid-inverse' : 'bg-grid')}
      />
      {dark && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[28rem] w-[28rem] animate-drift rounded-full bg-violet-500/25 blur-3xl"
        />
      )}
      <header className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <hgroup>
          {eyebrow && <Eyebrow tone={dark ? 'dark' : 'light'}>{eyebrow}</Eyebrow>}
          <h2
            id={id}
            className={cx('mt-3 text-4xl font-bold tracking-tight sm:text-5xl', dark ? 'text-white' : 'text-ink')}
          >
            {title}
          </h2>
          {description && (
            <p className={cx('mt-4 max-w-2xl text-lg leading-relaxed', dark ? 'text-brand-100' : 'text-ink-muted')}>
              {description}
            </p>
          )}
        </hgroup>
        {linkTo && (
          <Link
            to={linkTo}
            className={cx(
              'group inline-flex min-h-[3rem] items-center gap-3 justify-self-start rounded-full border py-1.5 pl-5 pr-1.5 font-medium transition-all hover:-translate-y-0.5 lg:justify-self-end',
              dark
                ? 'border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/15'
                : 'border-slate-200 bg-surface text-ink shadow-card hover:border-accent-line hover:shadow-pop',
            )}
          >
            {linkLabel}
            <span
              className={cx(
                'flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5',
                dark ? 'bg-white text-brand-700' : 'bg-brand-600 text-white dark:bg-brand-500',
              )}
            >
              <Icon name="arrow-right" className="h-5 w-5" />
            </span>
          </Link>
        )}
      </header>
      {children}
    </section>
  )
}
