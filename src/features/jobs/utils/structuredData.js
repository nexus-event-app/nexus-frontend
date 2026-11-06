import { absoluteUrl } from '@/shared/config/site'
import { paths } from '@/shared/config/paths'
import { postedAt } from './jobHelpers'

const EMPLOYMENT_TYPES = {
  FULL_TIME: 'FULL_TIME',
  PART_TIME: 'PART_TIME',
  INTERNSHIP: 'INTERN',
  FREELANCE: 'CONTRACTOR',
  TEMPORARY: 'TEMPORARY',
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function descriptionToHtml(text) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('')
}

export function buildJobPostingData(job) {
  const remote = job.workMode === 'REMOTE'

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: descriptionToHtml(job.description),
    datePosted: postedAt(job),
    ...(job.expiresAt && { validThrough: job.expiresAt }),
    employmentType: EMPLOYMENT_TYPES[job.contractType],
    directApply: false,
    url: absoluteUrl(paths.jobDetail(job)),
    hiringOrganization: { '@type': 'Organization', name: job.company },
    ...(remote
      ? {
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: { '@type': 'Country', name: 'España' },
        }
      : {
          jobLocation: {
            '@type': 'Place',
            address: { '@type': 'PostalAddress', addressLocality: job.location, addressCountry: 'ES' },
          },
        }),
    ...(job.tags?.length > 0 && { skills: job.tags.join(', ') }),
  }
}
