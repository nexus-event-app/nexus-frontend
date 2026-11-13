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
import FormField from '@/shared/components/FormField'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useForm } from '@/shared/hooks/useForm'
import { useRequest } from '@/shared/hooks/useRequest'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import { translate } from '@/shared/i18n/translate'
import ProfilePreview from '../components/ProfilePreview'
import TechnologiesInput from '../components/TechnologiesInput'
import { profileService } from '../services/profileService'
import { GITHUB_PATTERN, LINKEDIN_PATTERN, normalizeGithub, normalizeLinkedin } from '../utils/profileLinks'

const BIO_MAX = 300

function validate({ name, headline, bio, githubUrl, linkedinUrl }) {
  const errors = {}
  const nameLength = name.trim().length
  if (nameLength < 2 || nameLength > 50) errors.name = translate('profile.validation.name')
  if (headline.trim().length > 80) errors.headline = translate('profile.validation.headline')
  if (bio.trim().length > BIO_MAX) errors.bio = translate('profile.validation.bio')
  const github = normalizeGithub(githubUrl)
  if (github && !GITHUB_PATTERN.test(github)) errors.githubUrl = translate('profile.validation.github')
  const linkedin = normalizeLinkedin(linkedinUrl)
  if (linkedin && !LINKEDIN_PATTERN.test(linkedin)) errors.linkedinUrl = translate('profile.validation.linkedin')
  return errors
}

function toFormValues(profile) {
  return {
    name: profile.name ?? '',
    headline: profile.headline ?? '',
    bio: profile.bio ?? '',
    technologies: profile.technologies ?? [],
    githubUrl: profile.githubUrl ?? '',
    linkedinUrl: profile.linkedinUrl ?? '',
  }
}

function ProfileForm({ profile, onAvatarChange }) {
  const { t } = useI18n()
  const toast = useToast()
  const navigate = useNavigate()
  const { refreshUser } = useAuth()
  const [initialValues] = useState(() => toFormValues(profile))

  const form = useForm({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const saved = await profileService.update({
        name: values.name.trim(),
        headline: values.headline.trim(),
        bio: values.bio.trim(),
        technologies: values.technologies,
        githubUrl: normalizeGithub(values.githubUrl),
        linkedinUrl: normalizeLinkedin(values.linkedinUrl),
      })
      await refreshUser().catch(() => null)
      toast.success(t('profile.edit.saved'))
      navigate(paths.profile(saved))
    },
  })

  const technologiesError = Object.entries(form.errors).find(([key]) => key.startsWith('technologies'))?.[1]
  const bioLength = form.values.bio.trim().length

  return (
    // Sin envoltorio: la vista previa y el formulario se colocan en la rejilla de la página.
    <>
      <ProfilePreview
        className="mt-10 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-3 lg:self-start"
        values={form.values}
        fallbackName={profile.name}
        avatarUrl={profile.avatarUrl}
        onAvatarChange={onAvatarChange}
      />

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
        <fieldset className="space-y-6 [&>legend+*]:clear-left">
          <legend className="float-left mb-4 w-full text-lg font-bold text-ink">{t('profile.edit.basics')}</legend>
          <FormField
            {...form.getFieldProps('name')}
            label={t('profile.edit.name')}
            hint={t('profile.edit.nameHint')}
            autoComplete="name"
            maxLength={50}
            required
          />
          <FormField
            {...form.getFieldProps('headline')}
            label={t('profile.edit.headline')}
            placeholder={t('profile.edit.headlinePlaceholder')}
            maxLength={80}
          />
          <FormField
            {...form.getFieldProps('bio')}
            as="textarea"
            rows={4}
            label={t('profile.edit.bio')}
            placeholder={t('profile.edit.bioPlaceholder')}
            hint={t('profile.edit.bioHint', { count: bioLength, max: BIO_MAX })}
            maxLength={BIO_MAX}
          />
        </fieldset>
        <TechnologiesInput
          className="border-t border-slate-200 pt-8 [&>legend+*]:clear-left"
          legendClassName="float-left mb-4 w-full text-lg font-bold text-ink"
          value={form.values.technologies}
          onChange={(next) => form.setValue('technologies', next)}
          error={technologiesError}
        />
        <fieldset className="space-y-6 border-t border-slate-200 pt-8 [&>legend+*]:clear-left">
          {/* Leyendas flotantes: se comportan como un título más y no cortan el borde del grupo. */}
          <legend className="float-left mb-4 w-full text-lg font-bold text-ink">{t('profile.edit.links')}</legend>
          <p className="!mt-0 text-sm text-ink-muted">{t('profile.edit.linksHint')}</p>
          <FormField
            {...form.getFieldProps('githubUrl')}
            type="url"
            inputMode="url"
            autoComplete="url"
            label="GitHub"
            placeholder="https://github.com/tu-usuario"
            onBlur={(event) => form.setValue('githubUrl', normalizeGithub(event.target.value))}
            maxLength={200}
          />
          <FormField
            {...form.getFieldProps('linkedinUrl')}
            type="url"
            inputMode="url"
            label="LinkedIn"
            placeholder="https://www.linkedin.com/in/tu-usuario"
            onBlur={(event) => form.setValue('linkedinUrl', normalizeLinkedin(event.target.value))}
            maxLength={200}
          />
        </fieldset>
        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <ButtonLink to={paths.profile(profile)} variant="secondary" size="lg">
            {t('profile.edit.cancel')}
          </ButtonLink>
          <Button type="submit" size="lg" className="shadow-pop" loading={form.submitting}>
            {t('profile.edit.submit')}
          </Button>
        </footer>
      </form>
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
    </PageMain>
  )
}
