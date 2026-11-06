import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absoluteUrl, siteConfig } from '@/shared/config/site'
import { excerpt } from '@/shared/utils/text'

const MAX_TITLE = 60
const MAX_DESCRIPTION = 160

function buildTitle(title) {
  if (!title) return `${siteConfig.name} | ${siteConfig.tagline}`
  const suffix = ` | ${siteConfig.name}`
  const room = MAX_TITLE - suffix.length
  const fitted = title.length > room ? `${title.slice(0, room - 1).trimEnd()}…` : title
  return `${fitted}${suffix}`
}

export default function Seo({
  title,
  description = siteConfig.description,
  path,
  image,
  imageAlt,
  type = 'website',
  robots = 'index,follow',
  publishedTime,
  modifiedTime,
}) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.head.querySelectorAll('[data-seo-default]').forEach((element) => element.remove())
  }, [])

  const fullTitle = buildTitle(title)
  const summary = excerpt(description, MAX_DESCRIPTION)
  const url = absoluteUrl(path ?? pathname)
  const imageUrl = absoluteUrl(image || siteConfig.defaultImage)
  const alt = imageAlt || siteConfig.defaultImageAlt
  const indexable = !robots.startsWith('noindex')

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={summary} />
      <meta name="robots" content={robots} />
      {indexable && <link rel="canonical" href={url} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />
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
