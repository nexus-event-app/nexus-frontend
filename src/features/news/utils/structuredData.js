import { absoluteUrl, siteConfig } from '@/shared/config/site'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { excerpt } from '@/shared/utils/text'

export function buildNewsArticleData(article) {
  const url = absoluteUrl(paths.newsDetail(article))

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title.slice(0, 110),
    description: excerpt(article.content, 200),
    inLanguage: 'es',
    articleSection: newsCategories.labelOf(article.category),
    datePublished: article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    ...(article.imageUrl && { image: [absoluteUrl(article.imageUrl)] }),
    author: article.author
      ? { '@type': 'Person', name: article.author }
      : { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(siteConfig.logo) },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}
