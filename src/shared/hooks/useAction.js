import { useCallback, useEffect, useRef, useState } from 'react'
import { getErrorMessage } from '@/shared/api/ApiError'
import { useToast } from './useToast'

export function useAction(action, { successMessage } = {}) {
  const toast = useToast()
  const [pending, setPending] = useState(false)
  const actionRef = useRef(action)

  useEffect(() => {
    actionRef.current = action
  })

  const run = useCallback(
    async (...args) => {
      setPending(true)
      try {
        const result = await actionRef.current(...args)
        if (successMessage) toast.success(successMessage)
        return { ok: true, result }
      } catch (error) {
        toast.error(getErrorMessage(error))
        return { ok: false, result: undefined }
      } finally {
        setPending(false)
      }
    },
    [toast, successMessage],
  )

  return [run, pending]
}
