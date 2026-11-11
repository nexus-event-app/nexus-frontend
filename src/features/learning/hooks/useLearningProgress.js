import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useRequest } from '@/shared/hooks/useRequest'
import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { learningService } from '../services/learningService'

const keyOf = (pathId, stepId) => `${pathId}/${stepId}`

/**
 * Etapas hechas de la persona con sesión iniciada. Marcar o desmarcar se refleja al momento y, si el servidor falla,
 * se deshace y se avisa. Sin sesión no se pide nada y todas las etapas aparecen sin hacer.
 */
export function useLearningProgress() {
  const { t } = useI18n()
  const toast = useToast()
  const { user } = useAuth()
  const enabled = Boolean(user)
  const request = useRequest(
    `learning-progress:${user?.id ?? 'anon'}`,
    ({ signal }) => learningService.progress({ signal }),
    {
      enabled,
    },
  )
  const [pending, setPending] = useState(() => new Set())

  const done = new Set((request.data ?? []).map((item) => keyOf(item.pathId, item.stepId)))

  const setDone = (pathId, stepId, value) =>
    request.mutate((items) =>
      value
        ? [...items, { pathId, stepId, completedAt: new Date().toISOString() }]
        : items.filter((item) => item.pathId !== pathId || item.stepId !== stepId),
    )

  const setPendingFor = (key, value) =>
    setPending((current) => {
      const next = new Set(current)
      if (value) next.add(key)
      else next.delete(key)
      return next
    })

  const toggle = async (pathId, stepId) => {
    const key = keyOf(pathId, stepId)
    if (!request.data || pending.has(key)) return
    const value = !done.has(key)
    setDone(pathId, stepId, value)
    setPendingFor(key, true)
    try {
      await (value ? learningService.complete(pathId, stepId) : learningService.undo(pathId, stepId))
    } catch {
      setDone(pathId, stepId, !value)
      toast.error(t('learning.progress.saveError'))
    } finally {
      setPendingFor(key, false)
    }
  }

  return {
    enabled,
    ready: Boolean(request.data),
    isDone: (pathId, stepId) => done.has(keyOf(pathId, stepId)),
    isPending: (pathId, stepId) => pending.has(keyOf(pathId, stepId)),
    countDone: (path) => path.steps.filter((step) => done.has(keyOf(path.id, step.id))).length,
    toggle,
  }
}
