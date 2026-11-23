import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileFields from '@/features/profile/components/ProfileFields'
import { toProfileFormValues, toProfilePayload, validateProfile } from '@/features/profile/utils/profileForm'
import Alert from '@/shared/components/Alert'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Avatar from '@/shared/components/Avatar'
import Button from '@/shared/components/Button'
import ButtonLink from '@/shared/components/ButtonLink'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import ErrorState from '@/shared/components/ErrorState'
import Icon from '@/shared/components/Icon'
import PageHeader from '@/shared/components/PageHeader'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useForm } from '@/shared/hooks/useForm'
import { useRequest } from '@/shared/hooks/useRequest'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { adminUsersService } from '../services/adminUsersService'

function PhotoField({ profile, onRemoved }) {
  const [confirming, setConfirming] = useState(false)
  const [remove, removing] = useAction(
    async () => {
      onRemoved(await adminUsersService.removeAvatar(profile.id))
      setConfirming(false)
    },
    { successMessage: 'Foto quitada.' },
  )

  return (
    <fieldset className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
      <legend className="float-left col-span-full mb-4 w-full text-lg font-bold text-ink">Foto de perfil</legend>
      <Avatar name={profile.name} src={profile.avatarUrl} size="xl" />
      {profile.avatarUrl ? (
        <p>
          <Button variant="secondary" size="sm" onClick={() => setConfirming(true)}>
            <Icon name="trash" className="h-4 w-4" />
            Quitar foto
          </Button>
        </p>
      ) : (
        <p className="text-sm text-ink-muted">No tiene foto.</p>
      )}
      {confirming && (
        <ConfirmDialog
          title="Quitar foto"
          message={`Se quitará la foto de perfil de ${profile.name}. Podrá subir otra cuando quiera.`}
          confirmLabel="Quitar foto"
          tone="danger"
          pending={removing}
          onConfirm={remove}
          onCancel={() => setConfirming(false)}
        />
      )}
    </fieldset>
  )
}

function AdminProfileForm({ profile, onAvatarRemoved }) {
  const toast = useToast()
  const navigate = useNavigate()
  const [initialValues] = useState(() => toProfileFormValues(profile))
  const form = useForm({
    initialValues,
    validate: validateProfile,
    onSubmit: async (values) => {
      await adminUsersService.updateProfile(profile.id, toProfilePayload(values))
      toast.success('Perfil actualizado.')
      navigate(paths.adminUsers)
    },
  })

  return (
    <form
      onSubmit={form.handleSubmit}
      noValidate
      aria-label={`Perfil de ${profile.name}`}
      className="card max-w-3xl space-y-8 p-5 sm:p-8"
    >
      <PhotoField profile={profile} onRemoved={onAvatarRemoved} />
      <ProfileFields form={form} firstClassName="border-t border-slate-200 pt-8" />
      <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <ButtonLink to={paths.adminUsers} variant="secondary">
          Cancelar
        </ButtonLink>
        <Button type="submit" loading={form.submitting}>
          Guardar perfil
        </Button>
      </footer>
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
    </form>
  )
}

export default function AdminUserProfilePage() {
  const { userId } = useParams()
  const request = useRequest(`admin:user-profile:${userId}`, ({ signal }) =>
    adminUsersService.getProfile(userId, { signal }),
  )
  const profile = request.data

  return (
    <>
      <Seo title="Editar perfil" path={paths.adminUserProfile(userId)} robots="noindex,nofollow" />
      <PageHeader
        title={profile ? `Perfil de ${profile.name}` : 'Editar perfil'}
        description="Lo que cambies aquí es público: se verá en su perfil."
        actions={
          profile && (
            <ButtonLink to={paths.profile(profile)} variant="secondary">
              <Icon name="external" className="h-4 w-4" />
              Ver perfil público
            </ButtonLink>
          )
        }
      />
      {request.error ? (
        <ErrorState error={request.error} title="No hemos podido cargar el perfil" onRetry={request.reload} />
      ) : !profile ? (
        <ArticleSkeleton />
      ) : (
        <AdminProfileForm
          profile={profile}
          onAvatarRemoved={(updated) => request.mutate((current) => ({ ...current, avatarUrl: updated.avatarUrl }))}
        />
      )}
    </>
  )
}
