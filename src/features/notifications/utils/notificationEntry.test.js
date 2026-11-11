import { afterEach, describe, expect, it } from 'vitest'
import { setCurrentLanguage } from '@/shared/i18n/translate'
import { notificationEntry } from './notificationEntry'

const BASE = { discussionId: 21, discussionSlug: 'por-donde-empiezo', discussionTitle: '¿Por dónde empiezo?' }

afterEach(() => setCurrentLanguage('es'))

describe('notificationEntry', () => {
  it('describe una respuesta y enlaza al comentario', () => {
    expect(notificationEntry({ ...BASE, type: 'COMMENT', actorName: 'Luis', commentId: 5 })).toEqual({
      text: 'Luis ha respondido a tu discusión «¿Por dónde empiezo?»',
      href: '/foro/21-por-donde-empiezo#comentario-5',
    })
  })

  it('describe una mejor respuesta en el idioma actual', () => {
    setCurrentLanguage('en')
    const { text } = notificationEntry({ ...BASE, type: 'ACCEPTED_ANSWER', actorName: 'Ana', commentId: 5 })
    expect(text).toBe('Ana marked your answer as the best in “¿Por dónde empiezo?”')
  })

  it('sin comentario enlaza a la discusión y sin nombre usa uno genérico', () => {
    const entry = notificationEntry({ ...BASE, type: 'COMMENT', actorName: null, commentId: null })
    expect(entry.href).toBe('/foro/21-por-donde-empiezo')
    expect(entry.text).not.toContain('null')
  })
})
