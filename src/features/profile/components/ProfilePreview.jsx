import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'
import AvatarField from './AvatarField'

/**
 * Lateral de «Editar perfil»: la foto (que se guarda al momento) y una vista previa de lo que se está escribiendo, para
 * ver cómo quedará antes de guardar. Antetítulo y título fuera del recuadro, como en el resto de la web.
 */
export default function ProfilePreview({ values, fallbackName, avatarUrl, onAvatarChange, className }) {
  const { t } = useI18n()
  const name = values.name.trim() || fallbackName
  const headline = values.headline.trim()
  const bio = values.bio.trim()
  const links = [values.githubUrl && 'GitHub', values.linkedinUrl && 'LinkedIn'].filter(Boolean)

  return (
    <aside aria-labelledby="profile-preview-title" className={className}>
      <hgroup>
        <Eyebrow>{t('profile.edit.previewEyebrow')}</Eyebrow>
        <h2 id="profile-preview-title" className="mt-3 text-2xl font-bold tracking-tight text-ink">
          {t('profile.edit.previewTitle')}
        </h2>
      </hgroup>

      <article
        aria-labelledby="profile-preview-name"
        className="mt-5 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card"
      >
        <AvatarField name={name} avatarUrl={avatarUrl} onChange={onAvatarChange} />

        {/* Lo que se escribe en el formulario, tal como saldrá en el perfil. */}
        <h3
          id="profile-preview-name"
          className="mt-6 break-words border-t border-slate-200 pt-5 text-xl font-bold text-ink"
        >
          {name}
        </h3>
        {headline && <p className="mt-1 text-ink-muted">{headline}</p>}
        {bio && <p className="mt-4 line-clamp-4 whitespace-pre-line text-sm leading-relaxed text-ink-soft">{bio}</p>}
        {values.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={t('profile.view.technologies')}>
            {values.technologies.map((technology) => (
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
          // Solo la muestra de los botones: los enlaces de verdad están en el perfil.
          <ul className="mt-4 flex flex-wrap gap-2">
            {links.map((label) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-canvas px-3 py-1 text-sm font-semibold text-ink-soft"
              >
                <Icon name={label === 'GitHub' ? 'code' : 'briefcase'} className="h-4 w-4" />
                {label}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 flex gap-2 rounded-2xl bg-canvas p-3 text-xs leading-relaxed text-ink-muted">
          <Icon name="eye" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          {t('profile.edit.previewHint')}
        </p>
      </article>
    </aside>
  )
}
