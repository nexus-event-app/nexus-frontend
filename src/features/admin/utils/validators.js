import { isHttpUrl } from '@/shared/utils/url'

const MAX_TAGS = 10
const MAX_TAG_LENGTH = 30

export function parseTags(raw) {
  const unique = new Set(
    raw
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
  )
  return [...unique]
}

export function validateNews({ title, content, sourceUrl, author }) {
  const errors = {}
  const trimmedTitle = title.trim()
  if (!trimmedTitle) errors.title = 'El título es obligatorio.'
  else if (trimmedTitle.length > 200) errors.title = 'El título no puede superar los 200 caracteres.'
  const trimmedContent = content.trim()
  if (!trimmedContent) errors.content = 'El contenido es obligatorio.'
  else if (trimmedContent.length > 20000) errors.content = 'El contenido no puede superar los 20.000 caracteres.'
  if (sourceUrl.trim() && !isHttpUrl(sourceUrl.trim())) errors.sourceUrl = 'Introduce una URL válida que empiece por http:// o https://.'
  if (author.trim().length > 100) errors.author = 'El autor no puede superar los 100 caracteres.'
  return errors
}

export function validateJob({ title, company, description, location, tags, applyUrl, source }) {
  const errors = {}
  const requiredLimits = [
    ['title', title, 200, 'El título'],
    ['company', company, 120, 'La empresa'],
    ['location', location, 120, 'La ubicación'],
  ]
  requiredLimits.forEach(([field, value, max, label]) => {
    const trimmed = value.trim()
    if (!trimmed) errors[field] = `${label} es obligatorio.`
    else if (trimmed.length > max) errors[field] = `${label} no puede superar los ${max} caracteres.`
  })
  const trimmedDescription = description.trim()
  if (!trimmedDescription) errors.description = 'La descripción es obligatoria.'
  else if (trimmedDescription.length > 20000) errors.description = 'La descripción no puede superar los 20.000 caracteres.'
  const parsedTags = parseTags(tags)
  if (parsedTags.length > MAX_TAGS) errors.tags = `Máximo ${MAX_TAGS} etiquetas.`
  else if (parsedTags.some((tag) => tag.length > MAX_TAG_LENGTH)) {
    errors.tags = `Cada etiqueta puede tener como máximo ${MAX_TAG_LENGTH} caracteres.`
  }
  if (!applyUrl.trim()) errors.applyUrl = 'La URL para aplicar es obligatoria.'
  else if (!isHttpUrl(applyUrl.trim())) errors.applyUrl = 'Introduce una URL válida que empiece por http:// o https://.'
  if (source.trim().length > 100) errors.source = 'La fuente no puede superar los 100 caracteres.'
  return errors
}
