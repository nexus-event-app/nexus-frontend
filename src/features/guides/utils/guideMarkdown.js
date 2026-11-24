import { slugify } from '@/shared/utils/slug'

const HEADING = /^(#{2,3})\s+(.+)$/
const BULLET = /^[-*]\s+(.+)$/
const NUMBERED = /^\d+[.)]\s+(.+)$/
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g

export function parseInline(text) {
  return text
    .split(INLINE)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('**') && part.endsWith('**')) return { type: 'strong', text: part.slice(2, -2) }
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
      if (link) return linkToken(link[1], link[2])
      return { type: 'text', text: part }
    })
}

function linkToken(text, href) {
  if (/^\/(?!\/)/.test(href)) return { type: 'link', text, href, internal: true }
  if (/^https:\/\//i.test(href)) return { type: 'link', text, href, internal: false }
  return { type: 'text', text }
}

export function parseGuide(markdown) {
  const blocks = []
  const used = new Map()
  const chunks = (markdown ?? '').replace(/\r\n?/g, '\n').split(/\n\s*\n/)

  for (const chunk of chunks) {
    const lines = chunk
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    if (lines.length === 0) continue

    const heading = lines.length === 1 && lines[0].match(HEADING)
    if (heading) {
      const base = slugify(heading[2], 'apartado')
      const count = used.get(base) ?? 0
      used.set(base, count + 1)
      blocks.push({
        type: heading[1].length === 2 ? 'h2' : 'h3',
        id: count ? `${base}-${count + 1}` : base,
        text: heading[2],
      })
    } else if (lines.every((line) => BULLET.test(line))) {
      blocks.push({ type: 'ul', items: lines.map((line) => parseInline(line.match(BULLET)[1])) })
    } else if (lines.every((line) => NUMBERED.test(line))) {
      blocks.push({ type: 'ol', items: lines.map((line) => parseInline(line.match(NUMBERED)[1])) })
    } else {
      blocks.push({ type: 'p', content: parseInline(lines.join(' ')) })
    }
  }
  return blocks
}

export function plainText(markdown) {
  return (markdown ?? '').replace(/[#*]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}
