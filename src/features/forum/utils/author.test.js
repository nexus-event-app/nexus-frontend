import { describe, expect, it } from 'vitest'
import { authorOf } from './author'

const t = (key) => ({ 'forum.deletedAccount': 'Cuenta eliminada', 'forum.user': 'Usuario' })[key]

describe('authorOf', () => {
  it('enlaza a la persona que escribió', () => {
    expect(authorOf({ authorId: 3, authorName: 'Marta', authorAvatarUrl: '/a.jpg' }, t)).toEqual({
      id: 3,
      name: 'Marta',
      avatarUrl: '/a.jpg',
    })
  })

  it('si eliminó su cuenta, muestra «Cuenta eliminada» sin enlace a su perfil', () => {
    expect(authorOf({ authorId: 3, authorName: 'Cuenta eliminada', authorDeleted: true }, t)).toEqual({
      id: null,
      name: 'Cuenta eliminada',
      avatarUrl: null,
    })
  })

  it('sin nombre, «Usuario»', () => {
    expect(authorOf({ authorId: 3 }, t).name).toBe('Usuario')
  })
})
