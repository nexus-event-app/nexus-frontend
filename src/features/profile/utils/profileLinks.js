export const GITHUB_PATTERN = /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})\/?$/
export const LINKEDIN_PATTERN = /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/in\/[A-Za-z0-9\-_%.]{3,100}\/?$/

export function normalizeGithub(value) {
  const text = value.trim()
  if (!text) return ''
  if (/^@?[A-Za-z0-9-]{1,39}$/.test(text)) return `https://github.com/${text.replace(/^@/, '')}`
  return withHttps(text)
}

export function normalizeLinkedin(value) {
  const text = value.trim()
  if (!text) return ''
  if (/^[A-Za-z0-9\-_%.]{3,100}$/.test(text) && !text.includes('.com')) return `https://www.linkedin.com/in/${text}`
  return withHttps(text)
}

function withHttps(text) {
  if (/^(www\.)?(github|([a-z]{2,3}\.)?linkedin)\.com\//i.test(text)) return `https://${text}`
  return text.replace(/^http:\/\//i, 'https://')
}
