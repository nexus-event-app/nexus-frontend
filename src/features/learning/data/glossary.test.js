import { describe, expect, it } from 'vitest'
import { translate } from '@/shared/i18n/translate'
import messages from '@/shared/i18n/messages/glossary'
import {
  GLOSSARY,
  allTerms,
  glossarySearchGroup,
  normalize,
  plainText,
  searchTerms,
  splitCode,
  termPath,
} from './glossary'

const t = (key, params) => translate(key, params, 'es')

describe('glosario', () => {
  it('cada término del orden tiene sus textos en los tres idiomas, y no sobra ninguno', () => {
    const ids = GLOSSARY.flatMap((category) => category.terms)
    expect(new Set(ids).size).toBe(ids.length)
    for (const language of ['es', 'ca', 'en']) {
      expect(Object.keys(messages[language].terms).sort()).toEqual([...ids].sort())
      for (const id of ids) {
        const { term, definition, example } = messages[language].terms[id]
        expect(term && definition && example, `${language}.${id}`).toBeTruthy()
      }
    }
  })

  it('busca sin tildes ni mayúsculas, primero por nombre y después por definición', () => {
    expect(normalize('  Depuración ')).toBe('depuracion')
    const results = searchTerms(allTerms(t), 'api')
    expect(results[0].id).toBe('api')
    // «API» también aparece en el ejemplo de otros términos, pero detrás del propio término.
    expect(results.length).toBeGreaterThan(1)
    expect(searchTerms(allTerms(t), 'DEPURAR').map((item) => item.id)).toContain('depurar')
    expect(searchTerms(allTerms(t), '')).toHaveLength(allTerms(t).length)
    // En las definiciones cuentan las palabras que empiezan por el texto: «rama» no encuentra «programas».
    // «Rama» va la primera; detrás, los que hablan de ramas (merge, cambiar de rama…), pero no «Programar».
    const branches = searchTerms(allTerms(t), 'rama').map((item) => item.id)
    expect(branches[0]).toBe('rama')
    expect(branches).toContain('merge')
    expect(branches).not.toContain('programar')
  })

  it('da al buscador global un grupo con la misma forma que los del backend', () => {
    const group = glossarySearchGroup('commit', t, 1)
    expect(group.items).toHaveLength(1)
    expect(group.items[0]).toMatchObject({ id: 'commit', term: 'Commit' })
    expect(group.total).toBeGreaterThanOrEqual(1)
    expect(termPath('commit')).toBe('/glosario#termino-commit')
  })

  it('separa los comandos marcados como código y los quita donde no se pueden pintar', () => {
    expect(splitCode('`git add .` prepara todo')).toEqual([
      { text: 'git add .', code: true },
      { text: ' prepara todo', code: false },
    ])
    expect(plainText('con `-b` crea la rama')).toBe('con -b crea la rama')
    const { items } = glossarySearchGroup('git stash', t, 5)
    expect(items.every((item) => !item.definition.includes('`'))).toBe(true)
  })
})
