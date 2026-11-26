import { absoluteUrl, siteConfig } from '@/shared/config/site'
import { paths } from '@/shared/config/paths'

export function buildGuideData(guide) {
  const url = absoluteUrl(paths.guideDetail(guide))
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title.slice(0, 110),
    description: guide.description,
    inLanguage: guide.language || 'es',
    ...(guide.keywords?.length > 0 && { keywords: guide.keywords.join(', ') }),
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    image: [absoluteUrl(siteConfig.defaultImage)],
    author: { '@type': 'Organization', name: siteConfig.name, url: absoluteUrl('/') },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(siteConfig.logo) },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}
