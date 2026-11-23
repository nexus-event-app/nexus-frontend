import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef, useState } from 'react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { useDismiss } from './useDismiss'

function Menu() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  useDismiss(ref, open, () => setOpen(false))
  return (
    <>
      <nav ref={ref}>
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
          Tu cuenta
        </button>
        {open && <a href="/perfil">Mi perfil</a>}
      </nav>
      <button type="button">Fuera</button>
    </>
  )
}

describe('useDismiss', () => {
  it('Escape cierra el menú y devuelve el foco al botón que lo abrió', async () => {
    renderWithProviders(<Menu />)
    await userEvent.click(screen.getByRole('button', { name: 'Tu cuenta' }))
    await userEvent.tab()
    expect(screen.getByRole('link', { name: 'Mi perfil' })).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('link', { name: 'Mi perfil' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tu cuenta' })).toHaveFocus()
  })

  it('pulsar fuera cierra el menú sin mover el foco', async () => {
    renderWithProviders(<Menu />)
    await userEvent.click(screen.getByRole('button', { name: 'Tu cuenta' }))
    await userEvent.click(screen.getByRole('button', { name: 'Fuera' }))
    expect(screen.queryByRole('link', { name: 'Mi perfil' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Fuera' })).toHaveFocus()
  })
})
