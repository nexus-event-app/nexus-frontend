import { describe, expect, it } from 'vitest'
import { extractFaq, parseGuide, parseInline, plainText } from './guideMarkdown'

describe('formato de las guías', () => {
  it('reconoce apartados, párrafos y listas', () => {
    const blocks = parseGuide(
      'Intro en\ndos líneas.\n\n## 1. Haz balance\n\n- Uno\n- Dos\n\n1. Primero\n2. Segundo\n\n### Detalle',
    )
    expect(blocks.map((block) => block.type)).toEqual(['p', 'h2', 'ul', 'ol', 'h3'])
    expect(blocks[0].content).toEqual([{ type: 'text', text: 'Intro en dos líneas.' }])
    expect(blocks[1]).toMatchObject({ id: '1-haz-balance', text: '1. Haz balance' })
    expect(blocks[2].items).toHaveLength(2)
  })

  it('da un id distinto a dos apartados con el mismo título', () => {
    const ids = parseGuide('## Resumen\n\n## Resumen').map((block) => block.id)
    expect(ids).toEqual(['resumen', 'resumen-2'])
  })

  it('negritas y enlaces internos o seguros; el resto queda como texto', () => {
    expect(parseInline('Ve a **eventos** o al [foro](/foro).')).toEqual([
      { type: 'text', text: 'Ve a ' },
      { type: 'strong', text: 'eventos' },
      { type: 'text', text: ' o al ' },
      { type: 'link', text: 'foro', href: '/foro', internal: true },
      { type: 'text', text: '.' },
    ])
    expect(parseInline('[MDN](https://developer.mozilla.org)')[0]).toMatchObject({ type: 'link', internal: false })
    expect(parseInline('[malo](javascript:alert(1))')[0]).toMatchObject({ type: 'text' })
    expect(parseInline('[raro](//evil.example)')[0]).toEqual({ type: 'text', text: 'raro' })
  })

  it('reconoce el código dentro del texto', () => {
    expect(parseInline('Escribe `git status` antes.')).toEqual([
      { type: 'text', text: 'Escribe ' },
      { type: 'code', text: 'git status' },
      { type: 'text', text: ' antes.' },
    ])
  })

  it('el texto plano sirve para calcular el tiempo de lectura', () => {
    expect(plainText('## Título\n\n**Hola** [foro](/foro)')).toBe(' Título\n\nHola foro')
  })
})

describe('preguntas frecuentes de las píldoras', () => {
  it('saca cada pregunta con su respuesta en texto plano para Google y las IA', () => {
    const blocks = parseGuide(
      'Intro.\n\n## Preguntas frecuentes\n\n### ¿Es normal?\n\nSí, **muy** normal.\n\n- Le pasa a [mucha gente](/foro).\n\n### ¿Sin respuesta?\n\n## Otro apartado\n\n### No es FAQ\n\nTexto.',
    )
    expect(extractFaq(blocks)).toEqual([{ question: '¿Es normal?', answer: 'Sí, muy normal. Le pasa a mucha gente.' }])
  })

  it('reconoce el apartado en catalán e inglés y devuelve nada si no lo hay', () => {
    expect(extractFaq(parseGuide('## Preguntes freqüents\n\n### Què?\n\nAixò.'))).toHaveLength(1)
    expect(extractFaq(parseGuide('## Frequently asked questions\n\n### What?\n\nThis.'))).toHaveLength(1)
    expect(extractFaq(parseGuide('## Resumen\n\nNada.'))).toEqual([])
  })
})
