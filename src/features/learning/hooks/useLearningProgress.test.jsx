import { act, renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthContext } from '@/features/auth/hooks/authContext'
import { ToastContext } from '@/shared/components/toast/toastContext'
import I18nProvider from '@/shared/i18n/I18nProvider'
import { authValue, toastValue } from '@/test/render'
import { findLearningPath } from '../data/learningPaths'
import { learningService } from '../services/learningService'
import { useLearningProgress } from './useLearningProgress'

function renderProgress(user) {
  const toast = toastValue()
  const view = renderHook(() => useLearningProgress(), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <AuthContext.Provider value={authValue({ user })}>
          <ToastContext.Provider value={toast}>
            <I18nProvider>{children}</I18nProvider>
          </ToastContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    ),
  })
  return { ...view, toast }
}

const frontend = findLearningPath('frontend', 'es')

beforeEach(() => {
  vi.spyOn(learningService, 'progress').mockResolvedValue([
    { pathId: 'frontend', stepId: 'fundamentos', completedAt: '2026-11-01T10:00:00' },
  ])
  vi.spyOn(learningService, 'complete').mockResolvedValue()
  vi.spyOn(learningService, 'undo').mockResolvedValue()
})

describe('useLearningProgress', () => {
  it('sin sesión no pide nada al servidor', () => {
    const { result } = renderProgress(null)
    expect(result.current.enabled).toBe(false)
    expect(learningService.progress).not.toHaveBeenCalled()
  })

  it('carga lo hecho y lo cuenta por ruta', async () => {
    const { result } = renderProgress({ id: 7, name: 'Lucía' })
    await waitFor(() => expect(result.current.ready).toBe(true))
    expect(result.current.isDone('frontend', 'fundamentos')).toBe(true)
    expect(result.current.countDone(frontend)).toBe(1)
  })

  it('marca y desmarca etapas al momento y lo guarda', async () => {
    const { result } = renderProgress({ id: 7, name: 'Lucía' })
    await waitFor(() => expect(result.current.ready).toBe(true))

    await act(() => result.current.toggle('frontend', 'javascript'))
    expect(result.current.countDone(frontend)).toBe(2)
    expect(learningService.complete).toHaveBeenCalledWith('frontend', 'javascript')

    await act(() => result.current.toggle('frontend', 'fundamentos'))
    expect(result.current.isDone('frontend', 'fundamentos')).toBe(false)
    expect(learningService.undo).toHaveBeenCalledWith('frontend', 'fundamentos')
  })

  it('si el servidor falla deshace el cambio y avisa', async () => {
    learningService.complete.mockRejectedValue(new Error('500'))
    const { result, toast } = renderProgress({ id: 7, name: 'Lucía' })
    await waitFor(() => expect(result.current.ready).toBe(true))

    await act(() => result.current.toggle('frontend', 'javascript'))
    expect(result.current.isDone('frontend', 'javascript')).toBe(false)
    expect(toast.error).toHaveBeenCalledWith('No hemos podido guardar tu progreso. Inténtalo de nuevo.')
  })
})
