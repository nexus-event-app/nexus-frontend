import { useCallback, useEffect, useRef, useState } from 'react'
import { toApiError } from '@/shared/api/ApiError'

const INITIAL_STATE = { key: null, token: null, data: null, error: null }

export function useRequest(key, request, { enabled = true } = {}) {
  const [reloads, setReloads] = useState(0)
  const [state, setState] = useState(INITIAL_STATE)
  const requestRef = useRef(request)
  const token = `${key}#${reloads}`

  useEffect(() => {
    requestRef.current = request
  })

  useEffect(() => {
    if (!enabled) return undefined

    const controller = new AbortController()
    requestRef.current({ signal: controller.signal }).then(
      (data) => setState({ key, token, data, error: null }),
      (error) => {
        if (!controller.signal.aborted) {
          setState({ key, token, data: null, error: toApiError(error) })
        }
      },
    )
    return () => controller.abort()
  }, [key, token, enabled])

  const reload = useCallback(() => setReloads((count) => count + 1), [])

  const mutate = useCallback((updater) => {
    setState((current) => (current.data === null ? current : { ...current, data: updater(current.data) }))
  }, [])

  const settled = state.token === token

  return {
    data: state.key === key ? state.data : null,
    error: settled ? state.error : null,
    loading: enabled && !settled,
    reload,
    mutate,
  }
}
