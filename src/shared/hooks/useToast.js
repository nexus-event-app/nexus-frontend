import { useContext } from 'react'
import { ToastContext } from '@/shared/components/toast/toastContext'

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider')
  }
  return context
}
