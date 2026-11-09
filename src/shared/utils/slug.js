export function parseIdSlug(param) {
  const match = /^(\d+)(?:-(.*))?$/.exec(param ?? '')
  if (!match) return { id: null, slug: '' }
  return { id: Number(match[1]), slug: match[2] ?? '' }
}

export function buildSlugPath(base, item) {
  return `${base}/${item.id}${item.slug ? `-${item.slug}` : ''}`
}

/** Igual que SlugUtil.slugify del backend: «Ana García» → «ana-garcia». */
export function slugify(text, fallback = 'sin-titulo') {
  const slug = String(text ?? '')
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '')
  return slug || fallback
}
