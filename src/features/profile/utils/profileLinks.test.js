import { describe, expect, it } from 'vitest'
import { GITHUB_PATTERN, LINKEDIN_PATTERN, normalizeGithub, normalizeLinkedin } from './profileLinks'

describe('normalizeGithub', () => {
  it.each([
    ['ana-dev', 'https://github.com/ana-dev'],
    ['@ana-dev', 'https://github.com/ana-dev'],
    ['github.com/ana-dev', 'https://github.com/ana-dev'],
    ['http://github.com/ana-dev', 'https://github.com/ana-dev'],
    ['', ''],
  ])('«%s» → «%s»', (input, expected) => {
    expect(normalizeGithub(input)).toBe(expected)
  })

  it('el resultado cumple el patrón del backend', () => {
    expect(GITHUB_PATTERN.test(normalizeGithub('ana-dev'))).toBe(true)
    expect(GITHUB_PATTERN.test(normalizeGithub('https://gitlab.com/ana'))).toBe(false)
  })
})

describe('normalizeLinkedin', () => {
  it.each([
    ['ana-garcia', 'https://www.linkedin.com/in/ana-garcia'],
    ['linkedin.com/in/ana-garcia', 'https://linkedin.com/in/ana-garcia'],
    ['es.linkedin.com/in/ana-garcia', 'https://es.linkedin.com/in/ana-garcia'],
  ])('«%s» → «%s»', (input, expected) => {
    expect(normalizeLinkedin(input)).toBe(expected)
    expect(LINKEDIN_PATTERN.test(expected)).toBe(true)
  })
})
