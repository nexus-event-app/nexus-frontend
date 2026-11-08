import { translate } from '@/shared/i18n/translate'

export function validateDiscussion({ title, content, category }) {
  const errors = {}
  const titleLength = title.trim().length
  const contentLength = content.trim().length
  if (titleLength < 5 || titleLength > 200) errors.title = translate('forum.validation.title')
  if (contentLength < 10 || contentLength > 10000) {
    errors.content = translate('forum.validation.content')
  }
  if (!category) errors.category = translate('forum.validation.category')
  return errors
}

export function validateComment({ content }) {
  const length = content.trim().length
  if (length < 3 || length > 5000) {
    return { content: translate('forum.validation.comment') }
  }
  return {}
}
