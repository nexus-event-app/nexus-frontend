export function parseIdSlug(param) {
  const match = /^(\d+)(?:-(.*))?$/.exec(param ?? '')
  if (!match) return { id: null, slug: '' }
  return { id: Number(match[1]), slug: match[2] ?? '' }
}

export function buildSlugPath(base, item) {
  return `${base}/${item.id}${item.slug ? `-${item.slug}` : ''}`
}
