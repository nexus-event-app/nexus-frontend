import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { SavedJobsContext } from '../hooks/savedJobsContext'
import { savedJobsService } from '../services/savedJobsService'

/**
 * Qué ofertas tiene guardadas el usuario, para marcar el botón de guardar en listados y fichas. Se carga una vez
 * al iniciar sesión y se actualiza al momento al guardar o quitar (si el servidor falla, se deshace el cambio).
 */
export default function SavedJobsProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [state, setState] = useState({ userId: null, ids: new Set() })
  const [pending, setPending] = useState(() => new Set())
  const pendingRef = useRef(pending)
  // Cambios hechos mientras se carga la lista: la respuesta se pidió antes y no los incluye, así que se aplican
  // encima al llegar. Sin esto, guardar una oferta nada más entrar se perdía al terminar la carga.
  const changesWhileLoadingRef = useRef(null)

  useEffect(() => {
    pendingRef.current = pending
  }, [pending])

  useEffect(() => {
    if (userId === null) return undefined
    const controller = new AbortController()
    const changes = new Map()
    changesWhileLoadingRef.current = changes
    savedJobsService
      .ids({ signal: controller.signal })
      .then(
        (serverIds) => {
          const ids = new Set(serverIds)
          changes.forEach((saved, jobId) => (saved ? ids.add(jobId) : ids.delete(jobId)))
          setState({ userId, ids })
        },
        () => {
          // Sin la lista, los botones aparecen sin marcar; guardar sigue funcionando.
        },
      )
      .finally(() => {
        if (changesWhileLoadingRef.current === changes) changesWhileLoadingRef.current = null
      })
    return () => controller.abort()
  }, [userId])

  const ids = useMemo(() => (state.userId === userId ? state.ids : new Set()), [state, userId])

  const setSaved = useCallback(
    (jobId, saved) => {
      changesWhileLoadingRef.current?.set(jobId, saved)
      setState((current) => {
        const next = new Set(current.ids)
        if (saved) next.add(jobId)
        else next.delete(jobId)
        return { userId, ids: next }
      })
    },
    [userId],
  )

  const setPendingFor = (jobId, value) =>
    setPending((current) => {
      const next = new Set(current)
      if (value) next.add(jobId)
      else next.delete(jobId)
      return next
    })

  /** Guarda o quita la oferta. Devuelve el nuevo estado (true = guardada). Lanza el error si el servidor falla. */
  const toggle = useCallback(
    async (jobId) => {
      if (pendingRef.current.has(jobId)) return ids.has(jobId)
      const save = !ids.has(jobId)
      setSaved(jobId, save)
      setPendingFor(jobId, true)
      try {
        await (save ? savedJobsService.save(jobId) : savedJobsService.remove(jobId))
        return save
      } catch (error) {
        setSaved(jobId, !save)
        throw error
      } finally {
        setPendingFor(jobId, false)
      }
    },
    [ids, setSaved],
  )

  const value = useMemo(
    () => ({
      ready: state.userId !== null && state.userId === userId,
      count: ids.size,
      isSaved: (jobId) => ids.has(jobId),
      isPending: (jobId) => pending.has(jobId),
      toggle,
    }),
    [state.userId, userId, ids, pending, toggle],
  )

  return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>
}
