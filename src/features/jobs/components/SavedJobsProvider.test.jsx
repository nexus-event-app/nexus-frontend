import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthContext } from '@/features/auth/hooks/authContext'
import { authValue } from '@/test/render'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { savedJobsService } from '../services/savedJobsService'
import SavedJobsProvider from './SavedJobsProvider'

/** Promesa que la prueba resuelve cuando quiere, para simular un servidor lento. */
function deferred() {
  let resolve
  const promise = new Promise((done) => (resolve = done))
  return { promise, resolve }
}

function renderSavedJobs() {
  const auth = authValue({ user: { id: 7, name: 'Lucía' } })
  return renderHook(() => useSavedJobs(), {
    wrapper: ({ children }) => (
      <AuthContext.Provider value={auth}>
        <SavedJobsProvider>{children}</SavedJobsProvider>
      </AuthContext.Provider>
    ),
  })
}

beforeEach(() => {
  vi.spyOn(savedJobsService, 'save').mockResolvedValue()
  vi.spyOn(savedJobsService, 'remove').mockResolvedValue()
})

describe('SavedJobsProvider', () => {
  it('marca las ofertas que ya estaban guardadas', async () => {
    vi.spyOn(savedJobsService, 'ids').mockResolvedValue([11, 12])
    const { result } = renderSavedJobs()

    await waitFor(() => expect(result.current.ready).toBe(true))
    expect(result.current.isSaved(11)).toBe(true)
    expect(result.current.count).toBe(2)
  })

  it('no pierde lo que se guarda o se quita mientras aún se carga la lista', async () => {
    const list = deferred()
    vi.spyOn(savedJobsService, 'ids').mockReturnValue(list.promise)
    const { result } = renderSavedJobs()

    await act(() => result.current.toggle(11))
    await act(() => result.current.toggle(12))
    await act(() => result.current.toggle(12))
    expect(result.current.isSaved(11)).toBe(true)

    // Llega la lista del servidor, pedida antes de los cambios: tenía la 12 pero no la 11.
    await act(async () => list.resolve([12, 13]))

    expect(result.current.isSaved(11)).toBe(true)
    expect(result.current.isSaved(12)).toBe(false)
    expect(result.current.isSaved(13)).toBe(true)
  })

  it('deshace el cambio si el servidor falla', async () => {
    vi.spyOn(savedJobsService, 'ids').mockResolvedValue([])
    savedJobsService.save.mockRejectedValue(new Error('500'))
    const { result } = renderSavedJobs()
    await waitFor(() => expect(result.current.ready).toBe(true))

    await act(() => expect(result.current.toggle(11)).rejects.toThrow('500'))
    expect(result.current.isSaved(11)).toBe(false)
  })
})
