import Avatar from '@/shared/components/Avatar'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { formatMonthYear } from '@/shared/utils/date'

const LINKS = [
  { key: 'githubUrl', label: 'GitHub', icon: 'code' },
  { key: 'linkedinUrl', label: 'LinkedIn', icon: 'briefcase' },
]

function LinkPill({ href, icon, label, interactive }) {
  const { t } = useI18n()
  const classes =
    'inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-slate-200 bg-canvas px-4 text-sm font-semibold text-ink-soft'
  // En la vista previa de «Editar perfil» el enlace aún puede estar a medio escribir: se muestra sin enlazar.
  if (!interactive) {
    return (
      <span className={classes}>
        <Icon name={icon} className="h-4 w-4" />
        {label}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow ugc"
      className={cx(classes, 'transition-colors hover:border-accent-line hover:text-accent')}
    >
      <Icon name={icon} className="h-4 w-4" />
      {label}
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
      className={cx('rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:p-8', className)}
    >
      <header
        className={cx('grid gap-5', stacked ? 'justify-items-start' : 'grid-cols-[auto_minmax(0,1fr)] items-center')}
      >
        <Avatar name={profile.name} src={profile.avatarUrl} size="xl" className="ring-4 ring-accent-soft" />
        <hgroup className="min-w-0">
          <Heading id={headingId} className="break-words text-2xl font-bold tracking-tight text-ink">
            {profile.name}
          </Heading>
          {profile.headline && <p className="mt-1 text-ink-muted">{profile.headline}</p>}
          {profile.memberSince && (
            <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-muted">
              <Icon name="calendar" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {t('profile.view.memberSince')} {formatMonthYear(profile.memberSince)}
            </p>
          )}
        </hgroup>
      </header>

      {hasDetails ? (
        <>
          {profile.bio && (
            <p className="mt-6 whitespace-pre-line border-t border-slate-200 pt-6 leading-relaxed text-ink-soft">
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
                  className="rounded-lg border border-slate-200 bg-canvas px-2.5 py-1 text-sm font-medium text-ink-soft"
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
                    icon={link.icon}
                    label={link.label}
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
