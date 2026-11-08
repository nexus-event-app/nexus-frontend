import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absoluteUrl, siteConfig } from '@/shared/config/site'
import { DEFAULT_LANGUAGE, LANGUAGES, LANGUAGE_META, localizePath, stripLang } from '@/shared/i18n/languages'
import { useI18n } from '@/shared/i18n/useI18n'
import { excerpt } from '@/shared/utils/text'

const MAX_TITLE = 60
const MAX_DESCRIPTION = 160

function buildTitle(title, tagline) {
  if (!title) return `${siteConfig.name} | ${tagline}`
  const suffix = ` | ${siteConfig.name}`
  const room = MAX_TITLE - suffix.length
  const fitted = title.length > room ? `${title.slice(0, room - 1).trimEnd()}…` : title
  return `${fitted}${suffix}`
}

export default function Seo({
  title,
  description,
  path,
  image,
  imageAlt,
  type = 'website',
  robots = 'index,follow',
  publishedTime,
  modifiedTime,
}) {
  const { pathname } = useLocation()
  const { t, lang } = useI18n()

  useEffect(() => {
    document.head.querySelectorAll('[data-seo-default]').forEach((element) => element.remove())
  }, [])

  const fullTitle = buildTitle(title, t('seo.tagline'))
  const summary = excerpt(description ?? t('seo.description'), MAX_DESCRIPTION)
  // La ruta base no lleva prefijo de idioma; cada versión añade el suyo.
  const basePath = stripLang(path ?? pathname)
  const url = absoluteUrl(localizePath(basePath, lang))
  const imageUrl = absoluteUrl(image || siteConfig.defaultImage)
  const alt = imageAlt || t('seo.imageAlt')
  const indexable = !robots.startsWith('noindex')

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={summary} />
      <meta name="robots" content={robots} />
      {indexable && <link rel="canonical" href={url} />}
      {indexable &&
        LANGUAGES.map((language) => (
          <link
            key={language}
            rel="alternate"
            hrefLang={language}
            href={absoluteUrl(localizePath(basePath, language))}
          />
        ))}
      {indexable && (
        <link rel="alternate" hrefLang="x-default" href={absoluteUrl(localizePath(basePath, DEFAULT_LANGUAGE))} />
      )}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={LANGUAGE_META[lang].og} />
      {LANGUAGES.filter((language) => language !== lang).map((language) => (
        <meta key={language} property="og:locale:alternate" content={LANGUAGE_META[language].og} />
      ))}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={summary} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={summary} />
      <meta name="twitter:image" content={imageUrl} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
    </>
  )
}
