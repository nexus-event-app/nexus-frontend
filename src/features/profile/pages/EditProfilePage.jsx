import { useState } from 'react'
import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Alert from '@/shared/components/Alert'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Button from '@/shared/components/Button'
import ButtonLink from '@/shared/components/ButtonLink'
import ErrorState from '@/shared/components/ErrorState'
import Eyebrow from '@/shared/components/Eyebrow'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useForm } from '@/shared/hooks/useForm'
import { useRequest } from '@/shared/hooks/useRequest'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import AvatarField from '../components/AvatarField'
import DeleteAccountSection from '../components/DeleteAccountSection'
import ProfileFields from '../components/ProfileFields'
import ProfilePreview from '../components/ProfilePreview'
import { profileService } from '../services/profileService'
import { toProfileFormValues, toProfilePayload, validateProfile } from '../utils/profileForm'

function ProfileForm({ profile, onAvatarChange }) {
  const { t } = useI18n()
  const toast = useToast()
  const navigate = useNavigate()
  const { refreshUser } = useAuth()
  const [initialValues] = useState(() => toProfileFormValues(profile))

  const form = useForm({
    initialValues,
    validate: validateProfile,
    onSubmit: async (values) => {
      const saved = await profileService.update(toProfilePayload(values))
      await refreshUser().catch(() => null)
      toast.success(t('profile.edit.saved'))
      navigate(paths.profile(saved))
    },
  })

  return (
    // Sin envoltorio: el formulario y la vista previa se colocan en la rejilla de la página (en el móvil, la vista
    // previa queda debajo del formulario).
    <>
      <hgroup className="mt-14 lg:col-start-1 lg:row-start-3 lg:mt-10">
        <Eyebrow>{t('profile.edit.formEyebrow')}</Eyebrow>
        <h2 id="profile-form-title" className="mt-3 text-2xl font-bold tracking-tight text-ink">
          {t('profile.edit.formTitle')}
        </h2>
      </hgroup>
      <form
        onSubmit={form.handleSubmit}
        noValidate
        aria-labelledby="profile-form-title"
        className="mt-5 space-y-8 rounded-3xl border border-slate-200 bg-surface p-5 shadow-card sm:p-8 lg:col-start-1 lg:row-start-4"
      >
        {form.formError && <Alert variant="error">{form.formError}</Alert>}
        {/* La foto se guarda al momento, sin esperar a «Guardar perfil». */}
        <AvatarField
          name={form.values.name || profile.name}
          avatarUrl={profile.avatarUrl}
          onChange={onAvatarChange}
          legendClassName="mb-4 text-lg font-bold text-ink"
        />
        <ProfileFields form={form} firstClassName="border-t border-slate-200 pt-8" />
        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <ButtonLink to={paths.profile(profile)} variant="secondary" size="lg">
            {t('profile.edit.cancel')}
          </ButtonLink>
          <Button type="submit" size="lg" className="shadow-pop" loading={form.submitting}>
            {t('profile.edit.submit')}
          </Button>
        </footer>
      </form>

      <ProfilePreview
        className="mt-14 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-3 lg:mt-10 lg:self-start"
        values={form.values}
        fallbackName={profile.name}
        avatarUrl={profile.avatarUrl}
        memberSince={profile.memberSince}
      />
    </>
  )
}

export default function EditProfilePage() {
  const { t } = useI18n()
  const { user, refreshUser } = useAuth()
  const request = useRequest('profile:own', ({ signal }) => profileService.getOwn({ signal }))
  const profile = request.data

  const handleAvatarChange = (updated) => {
    request.mutate((current) => ({ ...current, avatarUrl: updated.avatarUrl }))
    refreshUser().catch(() => null)
  }

  return (
    // Como el perfil: cabecera arriba; a la izquierda, el formulario; a la derecha, la foto y la vista previa.
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Seo title={t('profile.edit.title')} path={paths.profileEdit} robots="noindex,nofollow" />
      <Breadcrumbs
        className="col-span-full"
        items={[
          ...(profile ? [{ label: profile.name, to: paths.profile(profile) }] : []),
          { label: t('profile.edit.title'), to: paths.profileEdit },
        ]}
      />
      <hgroup className="col-span-full mt-6 max-w-3xl">
        <Eyebrow>{t('profile.edit.eyebrow')}</Eyebrow>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t('profile.edit.title')}</h1>
        <p className="mt-3 text-lg text-ink-muted">{t('profile.edit.description')}</p>
      </hgroup>
      {user?.emailVerified === false ? (
        <VerifyEmailNotice className="col-span-full mt-10">{t('profile.edit.confirmEmail')}</VerifyEmailNotice>
      ) : request.error ? (
        <ErrorState
          className="col-span-full mt-10"
          error={request.error}
          title={t('profile.edit.error')}
          onRetry={request.reload}
        />
      ) : !profile ? (
        <ArticleSkeleton />
      ) : (
        <ProfileForm profile={profile} onAvatarChange={handleAvatarChange} />
      )}
      <DeleteAccountSection className="mt-16 lg:col-start-1 lg:row-start-5" />
    </PageMain>
  )
}
