import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '@/shared/i18n/useI18n'
import { ToastContext } from './toastContext'
import Toast, { AnchoredToast } from './Toast'

const MAX_TOASTS = 4
const TRIGGER_WINDOW = 15000
const TRIGGERS =
  'button, a[href], [role="button"], summary, input[type="submit"], input[type="checkbox"], input[type="radio"]'

function focusedTrigger() {
  const active = document.activeElement
  return active instanceof HTMLElement && active.matches(TRIGGERS) ? active : null
}

export default function ToastProvider({ children }) {
  const { t } = useI18n()
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)
  const lastTrigger = useRef(null)

  useEffect(() => {
    const remember = (element) => {
      if (element) lastTrigger.current = { element, at: Date.now() }
    }
    const handleClick = (event) => remember(event.target.closest?.(TRIGGERS))
    const handleSubmit = (event) => remember(event.submitter ?? event.target.querySelector('[type="submit"]'))
    document.addEventListener('click', handleClick, true)
    document.addEventListener('submit', handleSubmit, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('submit', handleSubmit, true)
    }
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const detach = useCallback((id) => {
    const fallback = focusedTrigger()
    setToasts((current) => current.map((toast) => (toast.id === id ? { ...toast, anchor: fallback } : toast)))
  }, [])

  const push = useCallback((type, message) => {
    nextId.current += 1
    const id = nextId.current
    const recent = lastTrigger.current
    const anchor =
      recent && Date.now() - recent.at < TRIGGER_WINDOW && recent.element.isConnected
        ? recent.element
        : focusedTrigger()
    setToasts((current) => [
      ...current.filter((toast) => toast.anchor !== anchor || !anchor).slice(-(MAX_TOASTS - 1)),
      { id, type, message, anchor },
    ])
  }, [])

  const api = useMemo(
    () => ({
      success: (message) => push('success', message),
      error: (message) => push('error', message),
      info: (message) => push('info', message),
    }),
    [push],
  )

  const floating = toasts.filter((toast) => !toast.anchor)

  return (
    <ToastContext.Provider value={api}>
      {children}
      {toasts
        .filter((toast) => toast.anchor)
        .map((toast) => (
          <AnchoredToast key={toast.id} {...toast} onDismiss={dismiss} onDetach={detach} />
        ))}
      <section
        aria-label={t('common.toast.region')}
        className="pointer-events-none fixed inset-x-4 top-20 z-[90] mx-auto sm:w-[28rem]"
      >
        <ol className="flex flex-col gap-3">
          {floating.map((toast) => (
            <Toast key={toast.id} {...toast} onDismiss={dismiss} />
          ))}
        </ol>
      </section>
    </ToastContext.Provider>
  )
}
