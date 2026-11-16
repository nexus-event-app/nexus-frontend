import { translate } from '@/shared/i18n/translate'
import { GITHUB_PATTERN, LINKEDIN_PATTERN, normalizeGithub, normalizeLinkedin } from './profileLinks'

/** Límite de la presentación, el mismo que valida el backend. */
export const BIO_MAX = 300

/** Valores del formulario a partir del perfil (los campos vacíos llegan como null). */
export function toProfileFormValues(profile) {
  return {
    name: profile.name ?? '',
    headline: profile.headline ?? '',
    bio: profile.bio ?? '',
    technologies: profile.technologies ?? [],
    githubUrl: profile.githubUrl ?? '',
    linkedinUrl: profile.linkedinUrl ?? '',
  }
}

export function validateProfile({ name, headline, bio, githubUrl, linkedinUrl }) {
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

/** Lo que se envía al backend: textos sin espacios sobrantes y enlaces completos. */
export function toProfilePayload(values) {
  return {
    name: values.name.trim(),
    headline: values.headline.trim(),
    bio: values.bio.trim(),
    technologies: values.technologies,
    githubUrl: normalizeGithub(values.githubUrl),
    linkedinUrl: normalizeLinkedin(values.linkedinUrl),
  }
}
