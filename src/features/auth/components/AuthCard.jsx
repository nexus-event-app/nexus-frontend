import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import { useI18n } from '@/shared/i18n/useI18n'

/** Lo que se gana con la cuenta (los mismos textos que la franja de la portada). */
const BENEFITS = [
  { key: 'benefitProgress', icon: 'academic' },
  { key: 'benefitJobs', icon: 'bookmark' },
  { key: 'benefitForum', icon: 'chat' },
  { key: 'benefitAlerts', icon: 'bell' },
]

/**
 * Página de acceso (entrar, registrarse, recuperar contraseña...). A la izquierda, el antetítulo, el título y la frase
 * (fuera de la tarjeta, como en el resto de la web), la tarjeta con el formulario y, debajo, el enlace para cambiar de
 * página. A la derecha, en pantallas grandes, un panel con el degradado de la marca que recuerda lo que se gana con la
 * cuenta (en el móvil no se muestra, para que el formulario quede a mano).
 */
export default function AuthCard({ eyebrow, title, subtitle, children, footer }) {
  const { t } = useI18n()

  return (
    <PageMain className="page-container page-section relative isolate grid items-start gap-x-16 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:justify-center">
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />

      <header className="mx-auto w-full max-w-md lg:col-start-1">
        <hgroup>
          <Eyebrow>{eyebrow ?? t('auth.eyebrow')}</Eyebrow>
          <h1 id="auth-title" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-ink-muted">{subtitle}</p>
        </hgroup>
      </header>

      {/* El formulario (o el aviso de cada página), en su tarjeta; toma el nombre del título de la página. */}
      <section
        aria-labelledby="auth-title"
        className="mx-auto mt-6 w-full max-w-md rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:p-8 lg:col-start-1"
      >
        {children}
      </section>

      <p className="mx-auto mt-6 w-full max-w-md text-center text-ink-soft lg:col-start-1">{footer}</p>

      <aside
        aria-label={t('auth.panel.label')}
        className="relative isolate hidden overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-10 text-white shadow-pop lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:block lg:self-start"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 animate-drift-slow rounded-full bg-brand-400/30 blur-3xl"
        />
        <p className="max-w-md text-2xl font-bold leading-snug tracking-tight">{t('auth.panel.title')}</p>
        <ul className="mt-10 space-y-4">
          {BENEFITS.map((benefit) => (
            <li key={benefit.key} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15"
              >
                <Icon name={benefit.icon} className="h-5 w-5" />
              </span>
              <span className="text-brand-50">{t(`home.paths.${benefit.key}`)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 flex items-center gap-2 text-sm font-medium text-brand-100">
          <Icon name="clock" className="h-4 w-4" />
          {t('home.paths.joinText')}
        </p>
      </aside>
    </PageMain>
  )
}
