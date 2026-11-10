import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ActionMenu from './ActionMenu'

describe('ActionMenu', () => {
  it('da a cada acción su propio elemento de lista, aunque vengan en fragmentos o condiciones', () => {
    const editing = false
    render(
      <ActionMenu>
        <button type="button">Guardar</button>
        {editing && <button type="button">Cancelar</button>}
        <>
          <a href="/foro">Foro</a>
          <a href="/empleo">Empleo</a>
        </>
      </ActionMenu>,
    )
    const menu = screen.getByRole('list')
    expect(menu.tagName).toBe('MENU')
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.queryByText('Cancelar')).not.toBeInTheDocument()
  })

  it('no pinta un menú vacío', () => {
    const { container } = render(<ActionMenu>{false}</ActionMenu>)
    expect(container).toBeEmptyDOMElement()
  })
})
