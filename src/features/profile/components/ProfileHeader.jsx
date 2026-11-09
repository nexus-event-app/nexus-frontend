import Avatar from '@/shared/components/Avatar'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'

function ExternalProfileLink({ href, icon, label, name }) {
  const { t } = useI18n()
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow ugc"
      className="btn btn-secondary btn-sm"
    >
      <Icon name={icon} className="h-4 w-4" />
      {label}
      <span className="sr-only">{t('profile.view.externalLink', { name })}</span>
    </a>
  )
}

/** Cabecera del perfil público: foto, nombre, titular, presentación, tecnologías y enlaces. */
export default function ProfileHeader({ profile, isOwn }) {
  const { t } = useI18n()
  return (
    <header className="card p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Avatar name={profile.name} src={profile.avatarUrl} size="xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="break-words text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{profile.name}</h1>
              {profile.headline && <p className="mt-1 text-lg font-medium text-ink-soft">{profile.headline}</p>}
              <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-muted">
                <Icon name="calendar" className="h-4 w-4" />
                {t('profile.view.memberSince')} <Time value={profile.memberSince} format="monthYear" />
              </p>
            </div>
            {isOwn && (
              <ButtonLink to={paths.profileEdit} variant="secondary" size="sm">
                <Icon name="pencil" className="h-4 w-4" />
                {t('profile.view.edit')}
              </ButtonLink>
            )}
          </div>

          {profile.bio && <p className="mt-5 max-w-prose whitespace-pre-line leading-relaxed text-ink-soft">{profile.bio}</p>}

          {profile.technologies.length > 0 && (
            <div className="mt-5">
              <h2 className="sr-only">{t('profile.view.technologies')}</h2>
              <ul className="flex flex-wrap gap-2" aria-label={t('profile.view.technologies')}>
                {profile.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-strong ring-1 ring-inset ring-accent-line"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(profile.githubUrl || profile.linkedinUrl) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.githubUrl && (
                <ExternalProfileLink href={profile.githubUrl} icon="code" label="GitHub" name="GitHub" />
              )}
              {profile.linkedinUrl && (
                <ExternalProfileLink href={profile.linkedinUrl} icon="briefcase" label="LinkedIn" name="LinkedIn" />
              )}
            </div>
          )}

          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-slate-200 pt-4 text-sm text-ink-muted">
            <li>
              <span className="text-lg font-bold text-ink">{profile.discussionCount}</span>{' '}
              {t('profile.view.discussionCount', { count: profile.discussionCount })}
            </li>
            <li>
              <span className="text-lg font-bold text-ink">{profile.testimonialCount}</span>{' '}
              {t('profile.view.testimonialCount', { count: profile.testimonialCount })}
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
