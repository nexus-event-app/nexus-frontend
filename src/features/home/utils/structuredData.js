import { absoluteUrl, siteConfig } from '@/shared/config/site'
import { paths } from '@/shared/config/paths'
import { getCurrentLanguage, translate } from '@/shared/i18n/translate'
import { localizePath } from '@/shared/i18n/languages'

export function buildHomeData() {
  const organizationId = `${siteConfig.url}/#organization`
  const language = getCurrentLanguage()
  const description = translate('seo.description')

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: absoluteUrl(localizePath(paths.home, language)),
      name: siteConfig.name,
      description,
      inLanguage: language,
      publisher: { '@id': organizationId },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${absoluteUrl(localizePath(paths.news, language))}?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: siteConfig.name,
      url: absoluteUrl(localizePath(paths.home, language)),
      logo: absoluteUrl(siteConfig.logo),
      description,
    },
  ]
}
