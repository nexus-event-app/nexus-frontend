import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

function ExternalProfileLink({ href, icon, label, name }) {
  const { t } = useI18n()
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow ugc"
      className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-slate-200 bg-canvas px-4 text-sm font-semibold text-ink-soft transition-colors hover:border-accent-line hover:text-accent sm:min-h-[2.25rem]"
    >
      <Icon name={icon} className="h-4 w-4" />
      {label}
      <span className="sr-only">{t('profile.view.externalLink', { name })}</span>
    </a>
  )
}

/**
 * «Sobre ti» / «Sobre {nombre}», al lado del perfil: antetítulo y título fuera (como siempre) y, en el recuadro, la
 * presentación, las tecnologías, los enlaces y la actividad (discusiones y testimonios).
 */
export default function ProfileAbout({ profile, isOwn, headingClassName, className }) {
  const { t } = useI18n()
  const hasLinks = Boolean(profile.githubUrl || profile.linkedinUrl)
  const empty = !profile.bio && profile.technologies.length === 0 && !hasLinks

  return (
    // Sin envoltorio: el título y el recuadro se colocan en la rejilla de la página (el recuadro es el apartado lateral
    // y toma su nombre del título).
    <>
      <hgroup className={headingClassName}>
        <Eyebrow>{t('profile.view.aboutEyebrow')}</Eyebrow>
        <h2 id="profile-about" className="mt-3 text-2xl font-bold tracking-tight text-ink">
          {isOwn ? t('profile.view.aboutTitleOwn') : t('profile.view.aboutTitle', { name: profile.name })}
        </h2>
      </hgroup>
      <aside
        aria-labelledby="profile-about"
        className={cx('rounded-3xl border border-slate-200 bg-surface p-6 shadow-card', className)}
      >
        {empty && (
          <p className="text-sm leading-relaxed text-ink-muted">
            {isOwn ? t('profile.view.emptyAboutOwn') : t('profile.view.emptyAbout')}
          </p>
        )}
        {profile.bio && <p className="whitespace-pre-line leading-relaxed text-ink-soft">{profile.bio}</p>}

        {profile.technologies.length > 0 && (
          <ul className={cx('flex flex-wrap gap-2', profile.bio && 'mt-5')} aria-label={t('profile.view.technologies')}>
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

        {hasLinks && (
          <p className={cx('flex flex-wrap gap-2', (profile.bio || profile.technologies.length > 0) && 'mt-5')}>
            {profile.githubUrl && (
              <ExternalProfileLink href={profile.githubUrl} icon="code" label="GitHub" name="GitHub" />
            )}
            {profile.linkedinUrl && (
              <ExternalProfileLink href={profile.linkedinUrl} icon="briefcase" label="LinkedIn" name="LinkedIn" />
            )}
          </p>
        )}

        {/* Actividad: número grande y lo que cuenta debajo. */}
        <dl
          aria-label={t('profile.view.stats')}
          className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5 text-center"
        >
          <dt className="sr-only">{t('profile.view.discussionCount', { count: profile.discussionCount })}</dt>
          <dd className="rounded-2xl bg-canvas py-3">
            <span className="block text-2xl font-bold text-ink">{profile.discussionCount}</span>
            <span aria-hidden="true" className="text-xs font-medium text-ink-muted">
              {t('profile.view.discussionCount', { count: profile.discussionCount })}
            </span>
          </dd>
          <dt className="sr-only">{t('profile.view.testimonialCount', { count: profile.testimonialCount })}</dt>
          <dd className="rounded-2xl bg-canvas py-3">
            <span className="block text-2xl font-bold text-ink">{profile.testimonialCount}</span>
            <span aria-hidden="true" className="text-xs font-medium text-ink-muted">
              {t('profile.view.testimonialCount', { count: profile.testimonialCount })}
            </span>
          </dd>
        </dl>
      </aside>
    </>
  )
}
