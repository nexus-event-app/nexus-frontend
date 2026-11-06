import { useCallback, useMemo, useRef, useState } from 'react'
import { ToastContext } from './toastContext'
import Toast from './Toast'

const MAX_TOASTS = 4

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const push = useCallback((type, message) => {
    nextId.current += 1
    const id = nextId.current
    setToasts((current) => [...current.slice(-(MAX_TOASTS - 1)), { id, type, message }])
  }, [])

  const api = useMemo(
    () => ({
      success: (message) => push('success', message),
      error: (message) => push('error', message),
      info: (message) => push('info', message),
    }),
    [push],
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-label="Notificaciones"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[90] flex flex-col gap-3 sm:left-auto sm:w-96"
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
