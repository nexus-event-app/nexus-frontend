import { useState } from 'react'
import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Alert from '@/shared/components/Alert'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Button from '@/shared/components/Button'
import ButtonLink from '@/shared/components/ButtonLink'
import ErrorState from '@/shared/components/ErrorState'
import FormField from '@/shared/components/FormField'
import PageHeader from '@/shared/components/PageHeader'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useForm } from '@/shared/hooks/useForm'
import { useRequest } from '@/shared/hooks/useRequest'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import { translate } from '@/shared/i18n/translate'
import AvatarField from '../components/AvatarField'
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
    <div className="space-y-8">
      <div className="card p-5 sm:p-6">
        <AvatarField name={form.values.name || profile.name} avatarUrl={profile.avatarUrl} onChange={onAvatarChange} />
      </div>

      <form onSubmit={form.handleSubmit} noValidate className="card space-y-6 p-5 sm:p-6">
        {form.formError && <Alert variant="error">{form.formError}</Alert>}
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
        <TechnologiesInput
          value={form.values.technologies}
          onChange={(next) => form.setValue('technologies', next)}
          error={technologiesError}
        />
        <fieldset className="space-y-5">
          <legend className="text-base font-bold text-ink">{t('profile.edit.links')}</legend>
          <p className="-mt-3 text-sm text-ink-muted">{t('profile.edit.linksHint')}</p>
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
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <ButtonLink to={paths.profile(profile)} variant="secondary">
            {t('profile.edit.cancel')}
          </ButtonLink>
          <Button type="submit" loading={form.submitting}>
            {t('profile.edit.submit')}
          </Button>
        </div>
      </form>
    </div>
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
    <div className="page-container page-section">
      <Seo title={t('profile.edit.title')} path={paths.profileEdit} robots="noindex,nofollow" />
      <Breadcrumbs
        items={[
          ...(profile ? [{ label: profile.name, to: paths.profile(profile) }] : []),
          { label: t('profile.edit.title'), to: paths.profileEdit },
        ]}
      />
      <div className="mx-auto max-w-3xl">
        <PageHeader title={t('profile.edit.title')} description={t('profile.edit.description')} />
        {user?.emailVerified === false ? (
          <VerifyEmailNotice>{t('profile.edit.confirmEmail')}</VerifyEmailNotice>
        ) : request.error ? (
          <ErrorState error={request.error} title={t('profile.edit.error')} onRetry={request.reload} />
        ) : !profile ? (
          <ArticleSkeleton />
        ) : (
          <ProfileForm profile={profile} onAvatarChange={handleAvatarChange} />
        )}
      </div>
    </div>
  )
}
