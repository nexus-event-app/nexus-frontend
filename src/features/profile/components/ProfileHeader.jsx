import Avatar from '@/shared/components/Avatar'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import { formatMonthYear } from '@/shared/utils/date'

/**
 * Cabecera del perfil público, como la del resto de páginas (sin recuadro): la foto, el antetítulo con la fecha de
 * llegada a la comunidad, el nombre y el titular y, si es tu perfil, «Editar perfil».
 */
export default function ProfileHeader({ profile, isOwn, className }) {
  const { t } = useI18n()
  return (
    <header className={className}>
      <Avatar name={profile.name} src={profile.avatarUrl} size="xl" className="shadow-card ring-4 ring-surface" />
      <hgroup className="min-w-0 self-center">
        <Eyebrow>{`${t('profile.view.memberSince')} ${formatMonthYear(profile.memberSince)}`}</Eyebrow>
        <h1 className="mt-3 break-words text-3xl font-bold tracking-tight text-ink sm:text-4xl">{profile.name}</h1>
        {profile.headline && <p className="mt-2 text-lg text-ink-muted">{profile.headline}</p>}
      </hgroup>
      {isOwn && (
        <ButtonLink
          to={paths.profileEdit}
          variant="secondary"
          className="self-center justify-self-start rounded-full sm:justify-self-end"
        >
          <Icon name="pencil" className="h-4 w-4" />
          {t('profile.view.edit')}
        </ButtonLink>
      )}
    </header>
  )
}
