import { absoluteUrl, siteConfig } from '@/shared/config/site'
import { paths } from '@/shared/config/paths'

export function buildHomeData() {
  const organizationId = `${siteConfig.url}/#organization`

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: absoluteUrl(paths.home),
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: 'es',
      publisher: { '@id': organizationId },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${absoluteUrl(paths.news)}?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: siteConfig.name,
      url: absoluteUrl(paths.home),
      logo: absoluteUrl(siteConfig.logo),
      description: siteConfig.description,
    },
  ]
}
