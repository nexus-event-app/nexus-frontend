import Avatar from '@/shared/components/Avatar'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { formatMonthYear } from '@/shared/utils/date'

/** Marcas de GitHub y LinkedIn (rellenas, en el color del texto del botón). */
const BRAND_PATHS = {
  github:
    'M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
}

const LINKS = [
  {
    key: 'githubUrl',
    label: 'GitHub',
    brand: 'github',
    className: 'bg-gray-900 text-white hover:bg-black dark:ring-1 dark:ring-inset dark:ring-white/20',
  },
  { key: 'linkedinUrl', label: 'LinkedIn', brand: 'linkedin', className: 'bg-[#0A66C2] text-white hover:bg-[#004182]' },
]

function BrandIcon({ brand }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-4 w-4 shrink-0" fill="currentColor">
      <path d={BRAND_PATHS[brand]} />
    </svg>
  )
}

/** Botón de una red social, con sus colores: se reconoce de un vistazo. Sube un poco al pasar el ratón. */
function LinkPill({ href, brand, label, className, interactive }) {
  const { t } = useI18n()
  const classes = cx(
    'inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-5 text-sm font-semibold shadow-card',
    className,
  )
  // En la vista previa de «Editar perfil» el enlace aún puede estar a medio escribir: se muestra sin enlazar.
  if (!interactive) {
    return (
      <span className={classes}>
        <BrandIcon brand={brand} />
        {label}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow ugc"
      className={cx(classes, 'transition-all hover:-translate-y-0.5 hover:shadow-pop')}
    >
      <BrandIcon brand={brand} />
      {label}
      <Icon name="external" className="h-3.5 w-3.5 opacity-80" />
      <span className="sr-only">{t('profile.view.externalLink', { name: label })}</span>
    </a>
  )
}

/**
 * La tarjeta de perfil: foto, nombre, titular, desde cuándo está en la comunidad, presentación, tecnologías y
 * enlaces. Es exactamente lo que ve cualquiera que entre en el perfil, y la misma que «Así te verán» al editarlo.
 * Nunca muestra la actividad de la persona. El nombre va dentro porque es el contenido de la tarjeta. `stacked` pone
 * la foto encima del nombre, para columnas estrechas.
 */
export default function ProfileCard({
  profile,
  headingLevel = 'h1',
  headingId,
  isOwn = false,
  interactiveLinks = true,
  stacked = false,
  action,
  className,
}) {
  const { t } = useI18n()
  const Heading = headingLevel
  const links = LINKS.filter((link) => profile[link.key])
  const hasDetails = Boolean(profile.bio || profile.technologies.length > 0 || links.length > 0)

  return (
    <article
      aria-labelledby={headingId}
      className={cx(
        'relative isolate overflow-hidden rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:p-8',
        className,
      )}
    >
      {/* Franja de color arriba, con luces que se mueven despacio: da vida sin quitar protagonismo a la persona. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600"
      >
        <span className="absolute -left-10 -top-16 h-44 w-44 animate-drift rounded-full bg-white/20 blur-2xl" />
        <span className="absolute -right-6 -top-10 h-36 w-36 animate-drift-slow rounded-full bg-pink-300/30 blur-2xl" />
      </span>
      <header
        // La foto asoma sobre la franja; el nombre queda siempre debajo de ella, sobre blanco, para que se lea bien.
        // En el móvil (y en columnas estrechas) la foto va encima del nombre.
        className={cx(
          'grid gap-x-5 gap-y-4 pt-4',
          stacked ? 'justify-items-start' : 'sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start',
        )}
      >
        <Avatar name={profile.name} src={profile.avatarUrl} size="xl" className="shadow-pop ring-4 ring-surface" />
        <hgroup className={cx('min-w-0', !stacked && 'sm:mt-[3.75rem]')}>
          <Heading id={headingId} className="break-words text-2xl font-bold tracking-tight text-ink">
            {profile.name}
          </Heading>
          {profile.headline && <p className="mt-1 font-medium text-accent">{profile.headline}</p>}
          {profile.memberSince && (
            <p className="mt-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-strong">
                <Icon name="calendar" className="h-4 w-4 shrink-0" />
                {t('profile.view.memberSince')} {formatMonthYear(profile.memberSince)}
              </span>
            </p>
          )}
        </hgroup>
      </header>

      {hasDetails ? (
        <>
          {profile.bio && (
            // La presentación, destacada como una cita: con la línea de color a la izquierda y el texto más grande.
            <p className="mt-6 whitespace-pre-line rounded-2xl border-l-4 border-accent bg-accent-soft/50 px-5 py-4 text-lg leading-relaxed text-ink">
              {profile.bio}
            </p>
          )}
          {profile.technologies.length > 0 && (
            <ul
              aria-label={t('profile.view.technologies')}
              className={cx('flex flex-wrap gap-2', profile.bio ? 'mt-5' : 'mt-6 border-t border-slate-200 pt-6')}
            >
              {profile.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-lg border border-accent-line/60 bg-surface px-2.5 py-1 text-sm font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  {technology}
                </li>
              ))}
            </ul>
          )}
          {links.length > 0 && (
            <ul
              aria-label={t('profile.view.links')}
              className={cx(
                'flex flex-wrap gap-2',
                profile.bio || profile.technologies.length > 0 ? 'mt-5' : 'mt-6 border-t border-slate-200 pt-6',
              )}
            >
              {links.map((link) => (
                <li key={link.key}>
                  <LinkPill
                    href={profile[link.key]}
                    brand={link.brand}
                    label={link.label}
                    className={link.className}
                    interactive={interactiveLinks}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="mt-6 border-t border-slate-200 pt-6 text-sm leading-relaxed text-ink-muted">
          {isOwn ? t('profile.view.emptyAboutOwn') : t('profile.view.emptyAbout')}
        </p>
      )}

      {action && <footer className="mt-6 border-t border-slate-200 pt-6">{action}</footer>}
    </article>
  )
}
