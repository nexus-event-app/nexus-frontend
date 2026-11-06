export function validateDiscussion({ title, content, category }) {
  const errors = {}
  const titleLength = title.trim().length
  const contentLength = content.trim().length
  if (titleLength < 5 || titleLength > 200) errors.title = 'El título debe tener entre 5 y 200 caracteres.'
  if (contentLength < 10 || contentLength > 10000) {
    errors.content = 'El contenido debe tener entre 10 y 10.000 caracteres.'
  }
  if (!category) errors.category = 'Elige una categoría.'
  return errors
}

export function validateComment({ content }) {
  const length = content.trim().length
  if (length < 3 || length > 5000) {
    return { content: 'El comentario debe tener entre 3 y 5.000 caracteres.' }
  }
  return {}
}
