export function excerpt(text, maxLength = 160) {
  const clean = (text ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (clean.length <= maxLength) return clean
  const cut = clean.slice(0, maxLength - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:\s]+$/, '')}…`
}

export function initialsOf(name) {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}

export function foldText(text, { maxLines = 8, maxLength = 600 } = {}) {
  const value = text ?? ''
  const lines = value.split('\n')
  if (lines.length <= maxLines && value.length <= maxLength) return null
  let folded = lines.slice(0, maxLines).join('\n')
  if (folded.length > maxLength) {
    const cut = folded.lastIndexOf(' ', maxLength)
    folded = folded.slice(0, cut > maxLength * 0.6 ? cut : maxLength)
  }
  return `${folded.trimEnd()}…`
}
