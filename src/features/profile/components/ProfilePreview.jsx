import Eyebrow from '@/shared/components/Eyebrow'
import { useI18n } from '@/shared/i18n/useI18n'
import ProfileCard from './ProfileCard'

/**
 * Lateral de «Editar perfil»: la misma tarjeta que ve cualquiera que entre en tu perfil, con lo que estás escribiendo,
 * para ver cómo quedará antes de guardar. Antetítulo y título fuera del recuadro, como en el resto de la web.
 */
export default function ProfilePreview({ values, fallbackName, avatarUrl, memberSince, className }) {
  const { t } = useI18n()
  const profile = {
    name: values.name.trim() || fallbackName,
    headline: values.headline.trim(),
    bio: values.bio.trim(),
    technologies: values.technologies,
    githubUrl: values.githubUrl.trim(),
    linkedinUrl: values.linkedinUrl.trim(),
    avatarUrl,
    memberSince,
  }

  return (
    <aside aria-labelledby="profile-preview-title" className={className}>
      <hgroup>
        <Eyebrow>{t('profile.edit.previewEyebrow')}</Eyebrow>
        <h2 id="profile-preview-title" className="mt-3 text-2xl font-bold tracking-tight text-ink">
          {t('profile.edit.previewTitle')}
        </h2>
        <p className="mt-2 text-sm text-ink-muted">{t('profile.edit.previewHint')}</p>
      </hgroup>
      <ProfileCard
        profile={profile}
        headingLevel="h3"
        headingId="profile-preview-name"
        isOwn
        interactiveLinks={false}
        stacked
        className="mt-5"
      />
    </aside>
  )
}
